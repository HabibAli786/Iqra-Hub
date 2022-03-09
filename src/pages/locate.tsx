import { IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar, 
    IonGrid,
    IonRow,
    IonCol
    } from '@ionic/react';
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const Locate: React.FC = (props: any) => {
    const [center, setCenter] = useState({lat: 52.408395, lng: -1.538154 });
    const [zoom, setZoom] = useState(18);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Locate Mosque</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonGrid>
                <IonRow className="ion-margin-top ion-justify-content-center">
                  <div style={{ height: '40vh', width: '80%' }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: 'AIzaSyCjq9tfhA0aQgI_hGpSJdSvai4kPVm3QLY' }}
                      defaultCenter={center}
                      defaultZoom={zoom}
                    >
                    <Marker
                      lat={52.408484}
                      lng={-1.538116}
                      text="Here"
                    />
                    </GoogleMapReact>
                  </div>
                </IonRow>
                <IonRow className="address">
                  <IonCol className="">Address: </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>176-184 Allesley Old Rd</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Coventry</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>CV5 8GJ</IonCol>
                </IonRow>
              </IonGrid>
            </IonContent>
        </IonPage> 
    )
}

export default Locate;