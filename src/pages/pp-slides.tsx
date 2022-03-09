import { IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar, 
    IonCard,
    IonItem,
    IonLabel,
    IonButton,
    IonRow,
    IonText,
    IonGrid,
    IonImg,
    IonRefresher, 
    IonRefresherContent
    } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './pp-slides.css';
import { RefresherEventDetail } from '@ionic/core';

const Slides: React.FC = () => {

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log('Begin async operation');
        
        window.location.reload(false);
        setTimeout(() => {
          console.log('Async operation has ended');
          event.detail.complete();
        }, 2000);
      }

    // API Call for getting the list of pdf files in directory
    const [files, setFiles] = useState([])

    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('hhttps://90da91ca.ngrok.io/download/filename/1').then(
            response => response.json()
        )
        setFiles(result) 
        }
        fetchData()
    }, [])

    // Acess data
    const file = files.map(dir => (dir))
    console.log(file)

    // API Call for number of pdf files
    const [numFiles, setNumFiles] = useState([])

    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('https://90da91ca.ngrok.io/download').then(
            response => response.json()
        )
        setNumFiles(result) 
        }
        fetchData()
    }, [])

    // Access Data
    const numFile = numFiles.map(title => (title["numFiles"]))
    let number: number
    number = numFile[0]

    // Loop for creating the correct number of cards for each pdf available
    const items = []

    for(let i = 0; i<number; i++) {
        items.push(
            <IonCard key={i}>
                <IonImg className="img-size" alt="loading..." src="https://90da91ca.ngrok.io/download/pdf/image"/>
                <IonItem>
                    <IonLabel>{files.map(dir => (dir[i]))}</IonLabel>
                    <IonButton fill="outline" slot="end" href={`https://90da91ca.ngrok.io/download/${files.map(dir => (dir[i]))}`}>Download</IonButton>
                </IonItem>
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
            <IonTitle>Presentation slides</IonTitle>
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
                    Here is a list of PDF slides that have been discussed at Jummah. You can download the pdf on your device by clicking the download button.
                </p>
            </IonText>

            {items}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage> 
    )
}

export default Slides;