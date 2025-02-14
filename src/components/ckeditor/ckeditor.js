import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';

import '../ckeditor/ckeditor.css';

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzY1NTM1OTksImp0aSI6Ijg5YzBmYjcwLWI4ZTUtNGE1My1hNDlhLWYxZGVkNTVmOTdkNSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjQ1Yzc4NzY3In0.LCw7-PG8sgPkbMxw4Gx9H6cxWCvVICkB_eSqMDkK_Wzu6XF9Zd349bm95aDR1Yjr5HD2E4T35aVJc9O5j_-CUQ';

export default function App() {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const [editorInstance, setEditorInstance] = useState(null); // Thêm state để lưu trữ instance editor
	const cloud = useCKEditorCloud({ version: '44.1.0' });

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const { ClassicEditor, editorConfig } = useMemo(() => {
		if (cloud.status !== 'success' || !isLayoutReady) {
			return {};
		}

		const {
			ClassicEditor,
			AutoImage,
			Autosave,
			BlockQuote,
			Bold,
			CloudServices,
			Essentials,
			Heading,
			ImageBlock,
			ImageCaption,
			ImageInline,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
			Indent,
			IndentBlock,
			Italic,
			Link,
			LinkImage,
			List,
			ListProperties,
			Paragraph,
			SpecialCharacters,
			Table,
			TableCaption,
			TableCellProperties,
			TableColumnResize,
			TableProperties,
			TableToolbar,
			TodoList,
			Underline
		} = cloud.CKEditor;

		return {
			ClassicEditor,
			editorConfig: {
				toolbar: {
					items: [
						'heading',
						'|',
						'bold',
						'italic',
						'underline',
						'|',
						'specialCharacters',
						'link',
						'insertTable',
						'blockQuote',
						'|',
						'bulletedList',
						'numberedList',
						'todoList',
						'outdent',
						'indent'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					AutoImage,
					Autosave,
					BlockQuote,
					Bold,
					CloudServices,
					Essentials,
					Heading,
					ImageBlock,
					ImageCaption,
					ImageInline,
					ImageInsertViaUrl,
					ImageResize,
					ImageStyle,
					ImageTextAlternative,
					ImageToolbar,
					ImageUpload,
					Indent,
					IndentBlock,
					Italic,
					Link,
					LinkImage,
					List,
					ListProperties,
					Paragraph,
					SpecialCharacters,
					Table,
					TableCaption,
					TableCellProperties,
					TableColumnResize,
					TableProperties,
					TableToolbar,
					TodoList,
					Underline
				],
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5',
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6',
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				image: {
					toolbar: [
						'toggleImageCaption',
						'imageTextAlternative',
						'|',
						'imageStyle:inline',
						'imageStyle:wrapText',
						'imageStyle:breakText',
						'|',
						'resizeImage'
					]
				},
				licenseKey: LICENSE_KEY,
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				list: {
					properties: {
						styles: true,
						startIndex: true,
						reversed: true
					}
				},
				placeholder: 'Type or paste your content here!',
				table: {
					contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
				}
			}
		};
	}, [cloud, isLayoutReady]);

	// Hàm submit dữ liệu lên MockAPI
	const submitData = async (editorData) => {
		const url = 'https://676376a017ec5852cae8f8f9.mockapi.io/IntroCentre'; // Thay URL mock API của bạn

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					content: editorData, // Dữ liệu từ CKEditor
				}),
			});

			const data = await response.json();
			console.log('Dữ liệu đã gửi:', data);
		} catch (error) {
			console.error('Lỗi khi gửi dữ liệu:', error);
		}
	};

	// Hàm xử lý gửi dữ liệu
	const handleSubmit = () => {
		if (editorInstance) {
			const editorData = editorInstance.getData(); // Lấy dữ liệu từ CKEditor
			submitData(editorData); // Gửi dữ liệu lên MockAPI
		} else {
			console.error('Editor chưa được khởi tạo');
		}
	};

	// Hàm onReady để cập nhật instance của CKEditor
	const handleEditorReady = (editor) => {
		setEditorInstance(editor); // Lưu instance của CKEditor
	};

	return (
		<div className="main-container">
			<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
				<div className="editor-container__editor">
					<div ref={editorRef}>
						{ClassicEditor && editorConfig && (
							<CKEditor
								editor={ClassicEditor}
								config={editorConfig}
								onReady={handleEditorReady} // Cập nhật instance khi CKEditor sẵn sàng
							/>
						)}
					</div>
				</div>
			</div>

			{/* Nút gửi dữ liệu */}
			<button onClick={handleSubmit}>Gửi dữ liệu</button>
		</div>
	);
}
