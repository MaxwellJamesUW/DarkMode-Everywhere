// This is the function that will send our message to the content script.
// It is asyncronous because we want to use the "await" keyword inside it,
// which lets us wait for something to complete. In this case we wait for
// a response from the content script.
async function sendMessageToContentScript(message) {
  // This code came from the Chrome extension documentation. It just gets
  // the currently active tab on the last focused window to ensure that we
  // send the message to the right place.
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  // We use the "await" keyword to wait for a response from the content
  // script. If you don't need a response, you can just run
  // "chrome.tabs.sendMessage(tab.id, message)" and omit the "const response = await"
  try{
    const response = await chrome.tabs.sendMessage(tab.id, message);
    // You can do something with response from the content script here,
    // if you chose to wait for it.
    console.log(response);
  }
  catch(error){
    window.alert("Can't change the style of this page!")
  }
  
}

const colorInput = document.getElementById("color-input");
const tColorInput = document.getElementById("tcolor-input");
const fontInput = document.getElementById("typeface");
const enableCheckbox = document.getElementById("enable");

console.log(fontInput.value);
const sendMessage = (e) => {
  // only send the message if the 'enabled' box is checked
  if(document.getElementById("enable").checked){
    // colorInput.value and tcolorInput is whatever the value is when this code runs
    sendMessageToContentScript({ color: colorInput.value, tcolor: tColorInput.value, font: fontInput.value });
  }
  else console.log("Color input changed but style is not enabled");
};

// Add an event listener to the message button that will send a message
// to the content script when the button is clicked.
colorInput.addEventListener("input", sendMessage);
tColorInput.addEventListener("input", sendMessage);
fontInput.addEventListener("change", sendMessage);
enableCheckbox.addEventListener("change", sendMessage);

// It is much more common to see an arrow function passed directly in as
// a parameter without assigning it to a variable:
//
// messageButton.addEventListener("click", (e) => {
//   sendMessageToContentScript({ test: messageText.value });
// });
