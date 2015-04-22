var bodyTemplateSrc = $('#body-template').html();
var bodyTemplate = Handlebars.compile(bodyTemplateSrc);

$(document).ready(function() {
	renderTemplate();
	setupMessageLoader();
});

var username = "Guest";
var root = new Firebase('https://prodigyaj.firebaseio.com/');
var chatRoom = root.child('chat')
var avatarUrl = "http://www.clipartbest.com/cliparts/MiL/bzM/MiLbzMLia.jpeg";
var messages = {}
function renderTemplate() {
	var context = {
		username: username,
		messages: messages
	};

	var renderedTemplate = bodyTemplate(context);
	$('#body-template-view').html(renderedTemplate);

	setupTemplateListeners();
}

function setupTemplateListeners() {
	$('#chat-box').keypress(function (e){
		if (e.which == 13) { // Enter
			var message = $('#chat-box').val();
			sendMessage(message);
			$('#chat-box').val('');
		}
	});
}

function setupMessageLoader() {
	chatRoom.on('value',function(snapshot){
	var newMessages = snapshot.val();
	messages = newMessages;
	renderTemplate();
	});
}



function sendMessage(msgText){
	chatRoom.push({
		avatarUrl: avatarUrl,
		username: username,
		msgText: msgText
	});

}