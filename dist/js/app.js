const searchBar = document.querySelector('#searchBar');
const searchUser = document.querySelector('#searchUser');
const Img = document.querySelector('.profile__image').getElementsByTagName('img');
const fullName = document.querySelector('#fullName');
const usernameGit = document.querySelector('#username');
const dateCreated = document.querySelector('.header__date');
const profileBio = document.querySelector('.profile__info__bio');
const Repo = document.querySelector('#repo');
const follower = document.querySelector('#follower');
const followers = document.querySelector('#followers');
const locationGit = document.querySelector('#location');
const twitter = document.querySelector('#twitter');
const blog = document.querySelector('#blog');
const company = document.querySelector('#company');
// searchBar.onclick = function shoot() {

//     console.log(Img[0]);
// }
// console.log('working');
// let inValue = document.querySelector('.inputVav');
// let btn = document.querySelector('.btn');
searchBar.onclick = function() {
    let getUsername = searchUser.value;
    const errInfo = document.querySelector('#err')

    searchBar.disabled = true;

    fetch(`https://api.github.com/users/${getUsername}`) //file json objects
        // .then(function(response) {
        //     return response.json();
        // })
        // .then(function(data) {
        //     appendData(data)
        // })
        // .catch(function(err) {
        //     console.log('error: ' + err);
        // });
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(data) {
            appendData(data)
        })
        .catch((error) => {
            // Handle the error
            errInfo.innerHTML = `Please enter a valid Username`;

            setTimeout(function() { errInfo.innerHTML = ''; }, 2000);
        });

    function appendData(data) {
        let datePic = data.created_at.split('T', 1);
        let datePc = datePic[0].split('-');
        let yearAll = datePc[0];
        let monthAll = datePc[1];
        let monthAllflod = +monthAll;
        let dailyAll = datePc[2];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        var MonthName = months[monthAllflod];


        Img[0].src = data.avatar_url;
        Img[0].alt = data.login;
        if (data.name == null) {
            fullName.innerHTML = `Name Unavailable`;
        } else {
            fullName.innerHTML = data.name;
        }
        usernameGit.href = data.html_url;
        usernameGit.innerHTML = `@${data.login}`;
        dateCreated.innerHTML = `Joined ${MonthName} ${dailyAll} ${yearAll}`;
        if (data.bio == null) {
            profileBio.innerHTML = `No Bio at the moment`;
        } else {
            profileBio.innerHTML = data.bio;
        }
        Repo.innerHTML = data.public_repos;
        follower.innerHTML = data.followers;
        followers.innerHTML = data.following;
        if (data.location == null) {
            locationGit.innerHTML = `(Unknown) Probably in space`;
        } else {
            locationGit.innerHTML = data.location;
        }
        // break
        if (data.twitter_username == null) {
            twitter.innerHTML = `No Twitter acount`;
        } else {
            twitter.innerHTML = data.twitter_username;
        }
        if (data.blog == "") {
            blog.innerHTML = `Not Found`;
            blog.href = `#`;
        } else {
            blog.innerHTML = data.blog;
            blog.href = data.blog;
        }
        if (data.company == null) {
            company.innerHTML = `Unavailable`;
        } else {
            company.innerHTML = data.company;
        }

    }
    searchUser.value = '';
    setTimeout(function() { searchBar.disabled = false; }, 2000);
}

const lmode = document.querySelector('.lightmode');
const dmode = document.querySelector('.darkmode');
const toggleBtn = document.querySelector('.toggle');
const toggleText = document.querySelector('#toggleText');
const modeBody = document.querySelector('body');
toggleBtn.addEventListener('click', () => {
    modeBody.classList.toggle('dark');
    modeBody.classList.toggle('light');
    lmode.classList.toggle('active');
    dmode.classList.toggle('active');

    if (toggleText.innerHTML == 'LIGHT') {
        toggleText.innerHTML = `DARK`;
    } else {
        toggleText.innerHTML = `LIGHT`;
    }

});

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
        if (event.matches) {
            modeBody.classList.toggle('dark');
            modeBody.classList.toggle('light');
            lmode.classList.toggle('active');
            dmode.classList.toggle('active');
            if (toggleText.innerHTML == 'LIGHT') {
                toggleText.innerHTML = `DARK`;
            } else {
                toggleText.innerHTML = `LIGHT`;
            }

        } else {
            //light mode
            modeBody.classList.remove('dark');
            lmode.classList.add('active');
            dmode.classList.remove('active');
            if (toggleText.innerHTML == 'LIGHT') {
                toggleText.innerHTML = `DARK`;
            } else {
                toggleText.innerHTML = `LIGHT`;
            }

        }
    })