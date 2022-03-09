import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonRefresher, 
  IonRefresherContent
  } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { RefresherEventDetail } from '@ionic/core';
import { Plugins } from '@capacitor/core';
import './Home.css';

const { LocalNotifications } = Plugins;

const HomePage: React.FC = () => {

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log('Begin async operation');
    
    window.location.reload(false);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.detail.complete();
    }, 4000);
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

  // API Call for timetable
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://90da91ca.ngrok.io/api/timetable').then(
        response => response.json()
      )
      setData(result) 
    }
    fetchData()
  }, [])

  // Access data
  // const id = data.map(id => (id["id"]))
  // const salahs = data.map(salah => (salah["salah"]))
  const startTime = data.map(startTime => (startTime["startTime"]))
  const jamaat = data.map(jamaat => (jamaat["jamaat"]))
  const day2 = data.map(hijriDate => (hijriDate["hijriDay"]))
  const month2 = data.map(month => (month["month"]))
  const year2 = data.map(year => (year["year"]))
  const Cmonth = data.map(Cmonth => (Cmonth["Cmonth"]))
  const Cyear = data.map(Cyear => (Cyear["Cyear"]))
  const date = data.map(date => (date["date"]))

  const notifs = LocalNotifications.schedule({
    notifications: [
      {
        title: `Fajr at ${startTime[0]}`,
        body: "View prayer timetable for Iqra Learning Centre",
        id: 1,
        schedule: { at: new Date(`${Cmonth[0]} ${date[0]}, ${Cyear[0]} ${startTime[0]}:00`) },
        sound: './public/assets/sounds/Azan.wav',
        // attachments: null,
        actionTypeId: "",
        extra: null
      },
      {
        title: `Zuhr at ${startTime[2]}`,
        body: "View prayer timetable for Iqra Learning Centre",
        id: 2,
        schedule: { at: new Date(`${Cmonth[0]} ${date[0]}, ${Cyear[0]} ${startTime[2]}:00`) },
        // sound: null,
        // attachments: null,
        actionTypeId: "",
        extra: null
      },
      {
        title: `Asr at ${startTime[3]}`,
        body: "View prayer timetable for Iqra Learning Centre",
        id: 3,
        schedule: { at: new Date(`${Cmonth[0]} ${date[0]}, ${Cyear[0]} ${startTime[3]}:00`) },
        // sound: null,
        // attachments: null,
        actionTypeId: "",
        extra: null
      },
      {
        title: `Maghrib at ${startTime[4]}`,
        body: "View prayer timetable for Iqra Learning Centre",
        id: 4,
        schedule: { at: new Date(`${Cmonth[0]} ${date[0]}, ${Cyear[0]} ${startTime[4]}:00`) },
        // sound: null,
        // attachments: null,
        actionTypeId: "",
        extra: null
      },
      {
        title: `Isha at ${startTime[5]}`,
        body: "View prayer timetable for Iqra Learning Centre",
        id: 5,
        schedule: { at: new Date(`${Cmonth[0]} ${date[0]}, ${Cyear[0]} ${startTime[5]}:00`) },
        // sound: null,
        // attachments: null,
        actionTypeId: "",
        extra: null
      },
    ]
  });
  console.log('scheduled notifications for jamaat', notifs);

  // console.log(data)
  // console.log(startTime[0])

  // API Call for date and year (NOT USED: Most take out of server as well)
  // const [date, setDate] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetch('https://726ceeb7.ngrok.io/api/date/').then(
  //       response => response.json()
  //     )
  //     setDate(result) 
  //   }
  //   fetchData()
  // }, [])

  // // Access data
  // const day = date.map(startTime => (startTime["day"]))
  // const month = date.map(startTime => (startTime["month"]))
  // const year = date.map(startTime => (startTime["year"]))

  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Today's Timetable</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="font">
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonGrid>
          <IonRow>
            <IonCol className="tester ion-text-center ion-margin-top" size="12">{day2[0]} {month2[0] + ", " + year2[0]}</IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="tester" size="5"></IonCol>
            <IonCol className="tester start-end ion-text-right" size="4">Start</IonCol>
            <IonCol className="tester start-end ion-text-right" size="3">Jamaat</IonCol>
          </IonRow>
          
          <IonRow className="fajr-row">
            <IonCol className="tester" size="5">Fajr</IonCol>
            <IonCol className="tester times ion-text-right" size="4">{startTime[0]}</IonCol>
            <IonCol className="tester times ion-text-right jamaat" size="3">{jamaat[0]}</IonCol>
          </IonRow>

          <IonRow className="sunrise-row ion-margin-top">
            <IonCol className="tester" size="5">Sunrise</IonCol>
            <IonCol className="tester sunrise-start ion-text-right" size="4">{startTime[1]}</IonCol>
            <IonCol className="tester ion-text-right jamaat" size="3"></IonCol>
          </IonRow>

          <IonRow className="zuhr-row ion-margin-top">
            <IonCol className="tester" size="5">Zuhr</IonCol>
            <IonCol className="tester ion-text-right" size="4">{startTime[2]}</IonCol>
            <IonCol className="tester ion-text-right jamaat" size="3">{jamaat[2]}</IonCol>
          </IonRow>

          <IonRow className="asr-row ion-margin-top">
            <IonCol className="tester" size="5">Asr</IonCol>
            <IonCol className="tester ion-text-right" size="4">{startTime[3]}</IonCol>
            <IonCol className="tester ion-text-right jamaat" size="3">{jamaat[3]}</IonCol>
          </IonRow>

          <IonRow className="maghrib-row ion-margin-top">
            <IonCol className="tester" size="5">Maghrib</IonCol>
            <IonCol className="tester ion-text-right" size="4">{startTime[4]}</IonCol>
            <IonCol className="tester ion-text-right jamaat" size="3">{jamaat[4]}</IonCol>
          </IonRow>

          <IonRow className="isha-row ion-margin-top">
            <IonCol className="tester" size="5">Isha</IonCol>
            <IonCol className="tester ion-text-right" size="4">{startTime[5]}</IonCol>
            <IonCol className="tester ion-text-right jamaat" size="3">{jamaat[5]}</IonCol>
          </IonRow>

          <IonRow className="ion-margin-top notfi-border">
            <IonCol className="daily-notfi" size="12">Daily Notifications:</IonCol>
            <IonCard className="notfi-card">
              <IonCardHeader>
                <IonCardTitle>{notfications[notfications.length-1]}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {time[time.length-1]}
              </IonCardContent>
            </IonCard>

            <IonCard className="notfi-card">
              <IonCardHeader>
                <IonCardTitle>{notfications[notfications.length-2]}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {time[time.length-2]}
              </IonCardContent>
            </IonCard>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
