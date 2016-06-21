import Flickr from './flickrapi.dev'
import './fromBrowser.js'

const testAPI = document.getElementById("testFlickrAPI")
const testAPIProxy = document.getElementById("testFlickrAPIProxy")
testAPI.onclick = function(evt){
  testFlickrAPI()
}
testAPIProxy.onclick = function(evt){
  testFlickrAPI(true)
}