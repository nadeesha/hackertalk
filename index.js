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
    var filtered = [];

    if (err) {
        console.error(err);
        process.exit();
    }

    result.hits.forEach(function (entry) {
        if (entry.title) {
            filtered.push(entry);
        };
    });

    if (filtered.length === 0) {
        console.log('sorry, no one had submitted this url before');
    } else if (filtered.length === 1) {
        openResult(filtered[0].objectID);
    } else if (process.argv[3] == "lucky"){
        openResult(filtered[0].objectID);
    } else {
        getUserPreference(filtered);
    }
}

if (process.argv.length !== 3 && process.argv.length !== 4) {
    console.error('usage: htalk <url> [lucky]');
    process.exit();
} else {
    request.get({
        url: 'https://hn.algolia.com/api/v1/search?query=' + encodeURIComponent(process.argv[2]),
        json: true
    }, processResult);
}
