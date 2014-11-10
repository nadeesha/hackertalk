#!/usr/bin/env node

'use strict';

var request = require('request'),
    moment = require('moment'),
    readline = require('readline'),
    open = require('open');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function openResult(HNID) {
    open('https://news.ycombinator.com/item?id=' + HNID);
}

function getUserPreference(submissions) {
    var options = [];

    require('console.table');

    submissions.forEach(function (submission) {
        options.push({
            index: options.length + 1,
            points: submission.points,
            title: submission.title,
            submitted: moment(submission.created_at).fromNow()
        });
    });

    console.log('\nfound multiple submissions of the url:\n')
    console.table(options);

    rl.question('enter the index of your preferred HN submission: ', function (answer) {
        var choice;

        try {
            choice = submissions[answer - 1].objectID;
        } catch (e) {
            console.error(e);
        } finally {
            if (!choice) {
                console.error('invalid choice :(');
            } else {
                openResult(submissions[answer - 1].objectID);
                rl.close();
            }
        }
    });
}

function processResult(err, response, result) {
    if (err) {
        console.error(err);
        process.exit();
    }   

    if (result.nbHits === 0) {
        console.log('sorry, no one had submitted this url before');
    } else if (result.nbHits === 1) {
        openResult(result.hits[0].objectID);
    } else {
        getUserPreference(result.hits);
    }
}

if (process.argv.length !== 3) {
    console.error('usage: htalk [url]');
    process.exit();
} else {
	request.get({
        url: 'https://hn.algolia.com/api/v1/search?query=' + encodeURIComponent(process.argv[2]),
        json: true
    }, processResult);
}