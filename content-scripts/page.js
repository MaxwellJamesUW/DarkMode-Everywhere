//Global variables that will be changed in scope
let newColor, newTcolor, newFont;

// Add a message listener that listens for a message from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // This is the whole message object that was sent from the popup
  console.log(message);

  // Pull out the color key so we can use it later
  newColor = message.color;
  newTcolor = message.tcolor;
  newFont = message.font;

  // Get the current color of the background to send it back to the popup
  const oldColor = getComputedStyle(document.body).backgroundColor;
  const oldTcolor = getComputedStyle(document.body).color;

  // Set the styles for these tags
  changeStyles(document.body);
  //for each kind of tag: get the html collection of all tags on the page, cast it as an array
  //then iterate through it and call the changeStyles function for each individual tag
  Array.from(document.getElementsByTagName("p")).forEach(changeStyles);
  Array.from(document.getElementsByTagName("div")).forEach(changeStyles);
  Array.from(document.getElementsByTagName("h1")).forEach(changeStyles);
  Array.from(document.getElementsByTagName("h2")).forEach(changeStyles);
  Array.from(document.getElementsByTagName("h3")).forEach(changeStyles);
  Array.from(document.getElementsByTagName("h4")).forEach(changeStyles);
  Array.from(document.getElementsByTagName("h5")).forEach(changeStyles);
  
  // Use the sendResponse function passed in by chrome to send a response
  sendResponse(`the background color has been changed from ${oldColor} to ${newColor}, and the text has changed from 
  ${oldTcolor} to ${newTcolor}!`);
});

function changeStyles (ele) {
  ele.style.backgroundColor = newColor;
  ele.style.color = newTcolor;
  if (newFont != '')
    ele.style.fontFamily = newFont;

}
