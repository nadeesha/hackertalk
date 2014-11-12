hackertalk
==========

Get HN discussion for the current URL, in a CLI.

# why?

When reading an article online, I sometimes feel that the discussion on HN is much more interesting than the article itself. 

# what's this?

hackertalk will take the url that you give it, and search via the awesome [hn.algolia.com]
(http://hn.algolia.com) and try to give you the submissions, on a CLI.

#installation
```sh
$ npm install hackertalk -g
```

#usage
```sh
$ htalk [url]
```

#demo?
![hackertalk in action](https://i.imgur.com/zW7GVme.gif)

#search whole of HN
This was uninteded,  but if you want to search with keywords, you can do it like:

```sh
$ htalk "multiple monitor productivity"
```

#contributors
- [Jonas Friedmann](https://github.com/frdmn)

#todos

* Prettifying output in colors
* I'm feeling lucky argument (`lucky`) to launch the top result without asking the user
* Filtering out old HN posts that cause blank titles
