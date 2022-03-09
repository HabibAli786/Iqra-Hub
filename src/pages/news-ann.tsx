import { IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent, 
    IonRefresher, 
    IonRefresherContent
    } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { RefresherEventDetail } from '@ionic/core';

const NewsAnn: React.FC = () => {

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log('Begin async operation');
        
        window.location.reload(false);
        setTimeout(() => {
          console.log('Async operation has ended');
          event.detail.complete();
        }, 2000);
      }

    // API Call for getting the list of notfications from the database
    const [notfi, setNotfi] = useState([])

    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('https://90da91ca.ngrok.io/notifications/list').then(
            response => response.json()
        )
        setNotfi(result) 
        }
        fetchData()
    }, [])

    // Acess data
    const notfications = notfi.map(name => (name["message"]))
    const time = notfi.map(name => (name["Timestamp"]))

    // API Call for number of notifications
    const [numNotfi, setNumNotfi] = useState([])

    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('https://90da91ca.ngrok.io/notifications/number').then(
            response => response.json()
        )
        setNumNotfi(result) 
        }
        fetchData()
    }, [])

    // Access Data
    const numArr = numNotfi.map(title => (title["numOfNotfi"]))
    let number: number
    number = numArr[0]
    console.log(number)

    // Loop for creating the correct number of cards for each pdf available
    const items = []

    for(let i = number-1; i>=0; i--) {
        items.push(
            <IonCard key={i}>
                <IonCardHeader>
                    <IonCardTitle>{notfications[i]}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                        {time[i]}
                </IonCardContent>
            </IonCard>
        )
    }
    // console.log(items)
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>News and Announcements</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonGrid>
                    <IonRow>
                        <IonText>
                            <p className="ion-text-left intro-font">
                                Here is a list of all the notfications sent out by IQRA Learning Centre
                            </p>
                        </IonText>
                        {items}  
                    </IonRow>
                </IonGrid>
      </IonContent>
        </IonPage> 
    )
}

export default NewsAnn;