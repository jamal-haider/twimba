import { data } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let tweetsFromLocalStorage = JSON.parse( localStorage.getItem('tweets') )
let tweetsData = []
if(tweetsFromLocalStorage)
{
    tweetsData = tweetsFromLocalStorage
}
else{
    tweetsData = data
}


document.addEventListener('click', function(e){
    if(e.target.dataset.reply)
        handleReplyClick(e.target.dataset.reply)
    else if(e.target.dataset.like)
        handleLikeClick(e.target.dataset.like)
    else if(e.target.dataset.retweet)
        handleRetweetClick(e.target.dataset.retweet)
    else if(e.target.id == 'tweet-btn')
        handleTweetBtnClick()
    else if(e.target.dataset.postReply)
        handlePostReplyClick(e.target.dataset.postReply)
    else if(e.target.dataset.postDelete)
        handlePostDeleteClick(e.target.dataset.postDelete)

})


function handlePostDeleteClick(tweetId){
    
    const index = tweetsData.findIndex((tweet) => tweet.uuid === tweetId)
    tweetsData.splice(index, 1)

    localStorage.setItem('tweets', JSON.stringify(tweetsData))
    
    render()
}

function handlePostReplyClick(tweetId)
{
    const inputText = document.getElementById('post-reply-' + tweetId).value
    if(inputText){
        let tweetObj = findTweetByID(tweetId)
        tweetObj.replies.push({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            tweetText: inputText,
        })

        localStorage.setItem('tweets', JSON.stringify(tweetsData))

        render()
        handleReplyClick(tweetId)


    }
}

function handleTweetBtnClick(){
    const inputText = document.getElementById('tweet-input')

    if(inputText.value){
        const newTweet =  {
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: inputText.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        }

        tweetsData.unshift(newTweet)
        localStorage.setItem('tweets', JSON.stringify(tweetsData))

        inputText.value = ""
        render()
    }
}


function handleReplyClick(tweetId){
    document.getElementById("replies-" + tweetId).classList.toggle('hidden')
}

function handleRetweetClick(tweetId){
    let tweetObj = findTweetByID(tweetId)
    if(tweetObj.isRetweeted)
        tweetObj.retweets--
    else
        tweetObj.retweets++
    tweetObj.isRetweeted = !tweetObj.isRetweeted

    localStorage.setItem('tweets', JSON.stringify(tweetsData))

    
    render()
}

function handleLikeClick(tweetId){
    let tweetObj = findTweetByID(tweetId)
    if(tweetObj.isLiked)
        tweetObj.likes--
    else
        tweetObj.likes++

    tweetObj.isLiked = !tweetObj.isLiked

    localStorage.setItem('tweets', JSON.stringify(tweetsData))

    

    render()
}


function getFeedHTML(){

    
    let feedHtml = ''
    tweetsData.forEach((tweet) => {
        const likeIconClass = tweet.isLiked ? 'liked' : ''
        const retweetIconClass = tweet.isRetweeted ? 'retweeted' : ''

        let repliesHtml = ''
        if(tweet.replies.length > 0)
            tweet.replies.forEach((reply) => {
                repliesHtml+= `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="/images/${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                </div>
                `
            })

        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="/images/${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet=${tweet.uuid}></i>
                                ${tweet.retweets}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-trash" data-post-delete=${tweet.uuid}></i>
                            </span>
                        </div>   
                    </div>            
                </div>
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
                <div class="add-tweet-reply">
                    <input type="text" placeholder="Type here..." id="post-reply-${tweet.uuid}">
                    <button class="reply-btn" id="reply-btn" data-post-reply="${tweet.uuid}">Reply</button>
                </div>
            </div>

            `
    })

    return feedHtml
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHTML()
}


function findTweetByID(id){
    return tweetsData.find(tweet => tweet.uuid === id)
}


render()