
/**
 * (String) room
 * (String) sender
 * (Boolean) isGroupChat
 * (void) replier.reply(message)
 * (Boolean) replier.reply(room, message, hideErrorToast = true) // true 고정값 반환
 * (String) imageDB.getProfileBase64()
 * (String) packageName
 */
const jsoup = org.jsoup.Jsoup;
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) 
{
	var result = jsoup.connect("https://www.googleapis.com/youtube/v3/search?key=AIzaSyAnQxv3Jafei3of3Pl6c98-TtBUTHOXOr0&part=snippet&q=kano")
		.ignoreContentType(true)
		.get()
		.body().text();
	result = JSON.parse(result);
	result.items.forEach(function(item){
		let type = item.id.kind;
		let channelTitle = item.snippet.channelTitle;
		let description = item.snippet.description;
		let thumbnail = item.snippet.thumbnails;//default, medium, high
		if(type == "youtube#video"){
			let uploadTime = item.snippet.publishTime;
			let title = item.snippet.title;
			let videoLink = "youtu.be/" + item.id.videoId;
			replier.reply("제목: " + title + "\n" +
				"링크: " + videoLink + "\n" +
				"설명: " + description + "\n" +
				"체널: " + channelTitle + "\n" +
				"업로드 시간: " + uploadTime + "\n" +
				"섬네일 링크: " + thumbnail.high.url);
		}
		else if(type == "youtube#channel"){
			replier.reply("체널명: " + channelTitle + "\n" +
				"설명: " + description + "\n" +
				"섬네일 링크: " + thumbnail.high.url);
		}
	})
}
