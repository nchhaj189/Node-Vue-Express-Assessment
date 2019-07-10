import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import uuidv1 from 'uuid/v1';

Vue.use(Vuex)

import { API_ENDPOINT } from './config';
import testData from '@/data/test-data';

export default new Vuex.Store({
    state: {
        // TODO don't use testData
        events: testData,//{},
        basicToken: false
    },
    mutations: {
        submitBasicToken: function( state, token ) {
            state.basicToken = `basic ${token}`;
        },
        updateList: function( state, list ) {
            state.events = list;
        }
    },
    actions: {

        deleteEvent: async function( { commit, state }, calendarEvent ) {
          let events_list = [];
          await axios({
            method: 'GET',
            url: `${API_ENDPOINT}/read/${calendarEvent.dateTime.split("T")[0]}`,
            headers: { authorization: state.basicToken }
          }).then( res => {
            events_list = res.data.message.events;
            for(var i = 0; i < events_list.length; i++) {
                if(events_list[i].id === calendarEvent.id) {
                  events_list.splice(i,1);
                  break;
                }
            }
          });
          if(events_list.length == 0) {
            return axios({
              method: 'DELETE', //was 'POST'
              url: `${API_ENDPOINT}/remove/${calendarEvent.dateTime.split("T")[0]}`, //no ${eventID} before
              headers: { authorization: state.basicToken }
            }); 
          }
          return axios({
            method: 'PUT', //was 'POST'
            url: `${API_ENDPOINT}/deleteUpdate/${calendarEvent.dateTime.split("T")[0]}`, //no ${eventID} before
            data: {"data": { "events" : events_list}},
            headers: { authorization: state.basicToken }
          });
        },

        modifyEvent: async function( { commit, state }, calendarEvent ) {
          let events = [];
          let event = [];
          event[0] = calendarEvent;
          let update;
          let alreadyExists;
          await axios({
            method: 'GET',
            url: `${API_ENDPOINT}/peek`,
            headers: { authorization: state.basicToken }
          }).then( res => {
            events = res;
            for(var i = 0; i < res.data.message.length; i++) {
              for(var j = 0; j < res.data.message[i].data.events.length; j++) {
                if(res.data.message[i].name === calendarEvent.dateTime.split("T")[0]) {
                  update = true;
                } else if(res.data.message[i].data.events[j].id == calendarEvent.id) {
                  alreadyExists = true;
                }
              }
            }
          });
          let message_index;
          if(alreadyExists) {
            let event_index;
            for(var i = 0; i < events.data.message.length; i++) {
              for(var j = 0; j < events.data.message[i].data.events.length; j++) {
                if(events.data.message[i].data.events[j].id === calendarEvent.id) {
                  message_index = i;
                  event_index = j;
                  break;
                }
              }
            }
            events.data.message[message_index].data.events.splice(event_index, 1)
            await axios({
              method: 'PUT', //was 'POST'
              url: `${API_ENDPOINT}/deleteUpdate/${events.data.message[message_index].name.split("T")[0]}`, //no ${eventID} before
              data: {"data": {"events":  events.data.message[message_index].data.events}},
              headers: { authorization: state.basicToken }
            });
            if(events.data.message[message_index].data.events.length === 0) {
              await axios({
                method: 'DELETE', //was 'POST'
                url: `${API_ENDPOINT}/remove/${events.data.message[message_index].name.split("T")[0]}`, //no ${eventID} before
                headers: { authorization: state.basicToken }
              });
            }
          }
          if(update) {
            return axios({
              method: 'PUT', //was 'POST'
              url: `${API_ENDPOINT}/update/${calendarEvent.dateTime.split("T")[0]}`, //no ${eventID} before
              data: {"data": {"events": event}},
              headers: { authorization: state.basicToken }
            });
          } else {
            return axios({
              method: 'POST', //was 'POST'
              url: `${API_ENDPOINT}/create/${calendarEvent.dateTime.split("T")[0]}`, //no ${eventID} before
              data: {"data": {"events": event}},
              headers: { authorization: state.basicToken }
            });
          }
        },

        createEvent: async function( { commit, state }, calendarEvent ) {
          calendarEvent.id = uuidv1();
          let events = [];
          events[0] = calendarEvent;
          let update;
          await axios({
            method: 'GET',
            url: `${API_ENDPOINT}/peek`,
            headers: { authorization: state.basicToken }
          }).then( res => {
            for(var i = 0; i < res.data.message.length; i++) {
              if(res.data.message[i].name === calendarEvent.dateTime.split("T")[0]) {
                update = true;
                break;
              }
            }
          });
          if(update == true) {
            return axios({
              method: 'PUT', //was 'POST'
              url: `${API_ENDPOINT}/update/${calendarEvent.dateTime.split("T")[0]}`, //no ${eventID} before
              data: {"data": {"events": events}},
              headers: { authorization: state.basicToken }
            });
          } else {
            return axios({
              method: 'POST', //was 'POST'
              url: `${API_ENDPOINT}/create/${calendarEvent.dateTime.split("T")[0]}`, //no ${eventID} before
              data: {"data": {"events": events}},
              headers: { authorization: state.basicToken }
            });
          }
        },

        checkBasicToken: function( { commit, state }, token ) {
          return axios({
            method: 'GET',
            url: `${API_ENDPOINT}/check`,
            headers: { authorization: `basic ${token}` }
          });
        },

        getList: function( { commit, state } ) {

          // TODO remove return, actually implement endpoint
          return axios({
              method: 'GET',
              url: `${API_ENDPOINT}/peek`,
              headers: { authorization: state.basicToken }
            }).then( res => {
              let front_json = [];
              for(var i = 0; i < res.data.message.length; i++) {
                front_json[i] = {
                  date: `${res.data.message[i].name}T00:00:00.0000Z`,
                  events: res.data.message[i].data.events
                };
              }
              commit( 'updateList', front_json );
            });
          // TODO end remove return
        }
    }
})
