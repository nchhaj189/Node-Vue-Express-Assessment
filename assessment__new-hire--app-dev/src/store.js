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
          return axios({
            method: 'PUT', //was 'POST'
            url: `${API_ENDPOINT}/deleteUpdate/${calendarEvent.dateTime.split("T")[0]}`, //no ${eventID} before
            data: {"data": calendarEvent},
            headers: { authorization: state.basicToken }
          });
        },

        modifyEvent: async function( { commit, state }, calendarEvent ) {
          let event = [];
          event[0] = calendarEvent;
          return axios({
            method: 'PUT', //was 'POST'
            url: `${API_ENDPOINT}/update/${calendarEvent.dateTime.split("T")[0]}`, //no ${eventID} before
            data: {"data": {"events": event}},
            headers: { authorization: state.basicToken }
          });
        },

        createEvent: async function( { commit, state }, calendarEvent ) {
          calendarEvent.id = uuidv1();
          let events = [];
          events[0] = calendarEvent;
          return axios({
            method: 'POST', //was 'POST'
            url: `${API_ENDPOINT}/create/${calendarEvent.dateTime.split("T")[0]}`, //no ${eventID} before
            data: {"data": {"events": events}},
            headers: { authorization: state.basicToken }
          });
        },

        checkBasicToken: function( { commit, state }, token ) {
          return axios({
            method: 'GET',
            url: `${API_ENDPOINT}/check`,
            headers: { authorization: `basic ${token}` }
          });
        },

        getList: function( { commit, state } ) {
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
        }
    }
})
