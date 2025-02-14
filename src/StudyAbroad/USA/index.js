import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import apiUrls from '../../backend/mockAPI';
import '../USA/index.css';
import Menu from '../../components/Menu/menu';

const Usa = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [studyAbroadData, setStudyAbroadData] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [informationListData, setInformationListData] = useState([]);
  const [otherInformationData, setOtherInformationData] = useState([]);
  const [sidebarData, setSidebarData] = useState([]);
  
  useEffect(() => {
    fetch(apiUrls.thuanPham)
      .then(response => response.json())
      .then(data => {
        setSliderData(data);
        if (id) {
          const event = data.find(item => item.id === id);
          setEventData(event);
        } else if (data.length > 0) {
          setEventData(data[0]);
        }
      });

    fetch(apiUrls.faker_2)
      .then(response => response.json())
      .then(data => setStudyAbroadData(data));

    fetch(apiUrls.thuanPham)
      .then(response => response.json())
      .then(data => {
        const duHocMyData = data.filter(item => item.category === 'Du học Mỹ');
        setInformationListData(duHocMyData);
      });

    fetch(apiUrls.otherContent)
      .then(response => response.json())
      .then(data => setSidebarData(data));

    fetch(apiUrls.faker_2)
      .then(response => response.json())
      .then(data => {
        const otherInfoData = data.filter(item => item.category === 'Du học Mỹ');
        setOtherInformationData(otherInfoData);
      });
  }, [id]);

  const handleTitleClick = (itemId) => {
    const event = sliderData.find(item => item.id === itemId);
    setEventData(event);
  };

  if (!eventData) return <div>Loading...</div>;

  return (
    <div className="usa-system-container">
      <Header />
      <div className="usa-menu">
        <Menu />
      </div>
      <div className="usa-system-body">
        <div className='usa-body-title'>
          <h1 className='usa-body-title1'>
            DU HỌC MỸ
          </h1>
          <h1 className='usa-body-title2'>THÔNG TIN KHÁC</h1>
        </div>
        <div className="content-column">
          {id ? (
            <>
              <h1 className="usa-title">{eventData.title}</h1>
              <img src={eventData.imageUrl} alt={eventData.title} className="usa-image" />
              <section className="usa-info">
                <p>{eventData.content}</p>
              </section>
            </>
          ) : (
            <>
              <div className="information-list">
                <div className="information-column">
                  {informationListData.map((policy) => (
                    <div key={policy.id} className="info-item">
                      <img src={policy.imageUrl} alt={policy.name} className="school-image" />
                      <div className="school-info">
                        <button onClick={() => handleTitleClick(policy.id)} className="sidebar-title-button">
                          <h1>{policy.title}</h1>
                        </button>
                        <p>{policy.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="information-column">
                  {otherInformationData.map((policy) => (
                    <div key={policy.id} className="info-item">
                      <img src={policy.imageUrl} alt={policy.name} className="school-image" />
                      <div className="school-info">
                        <button onClick={() => handleTitleClick(policy.id)} className="sidebar-title-button">
                          <h1>{policy.title}</h1>
                        </button>
                        <p>{policy.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="divider"></div>
        </div>

        <div className="sidebar-column">
          <div className="sidebar-row">
            <ul>
              {sidebarData.map((policy) => (
                <li key={policy.id}>
                  <img src={policy.imageUrl} alt={policy.name} className="sidebar-school-image" />
                  <div className="school-info">
                    <button onClick={() => handleTitleClick(policy.id)} className="sidebar-title-button">
                      <h1>{policy.title}</h1>
                    </button>
                    <p>{policy.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Usa;
