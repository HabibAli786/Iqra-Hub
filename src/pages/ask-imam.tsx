import { IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonRefresher, 
    IonRefresherContent 
    } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './ask-imam.css';
import { RefresherEventDetail } from '@ionic/core';
import './Home.css';

const AskImam: React.FC = () => {

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log('Begin async operation');
        
        window.location.reload(false);
        setTimeout(() => {
          console.log('Async operation has ended');
          event.detail.complete();
        }, 2000);
      }

    // API Call for getting the list of notfications from the database
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('https://90da91ca.ngrok.io/ask-imam/data').then(
            response => response.json()
        )
        setData(result) 
        }
        fetchData()
    }, [])
    
    // Acess data
    const name = data.map(name => (name["name"]))
    const desc = data.map(name => (name["desc"]))
    const phone = data.map(name => (name["number"]))
    const email = data.map(name => (name["email"]))
    console.log(name)
    console.log(desc)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Ask ImamT</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
                <IonGrid>
                    <IonRow className="tester ion-margin-top">
                        <img className="img-center" src="https://90da91ca.ngrok.io/ask-imam/image" />
                    </IonRow>
                    <IonRow>
                        <IonCol className="tester ion-text-center img-title" size="12">{name[0]}</IonCol>
                    </IonRow>
                    <IonRow className="ion-margin-top">
                        <IonCol className="tester ion-text-center" size="12">{desc[0]}</IonCol>
                    </IonRow>
                    <IonRow className="info-start-margin-top">
                        <IonCol className="tester" size="12">Tel: {phone[0]}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="tester" size="12">Email: {email[0]}</IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage> 
    )
}

export default AskImam;
