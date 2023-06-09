---
layout: default
title: Home
birthday: 2000-08-01
---

{% assign dateStart = page.birthday | date: '%s' %}
{% assign nowTimestamp = 'now' | date: '%s' %}

{% assign diffSeconds = nowTimestamp | minus: dateStart %}
{% assign diffDays = diffSeconds | divided_by: 3600 | divided_by: 24 | divided_by: 365 %}


# Welcome to my Blog!

This is the homepage of my blog. Every now and then I will come back here - whenever I've done with a project or something - and write a post about it. I'm not sure if I'll ever do that, but I'll try.

This blog is by no means professional nor do i have the plan to monetize it. It's just a place where I gather my thoughts on certain topics and share them with the world. I'm not sure if anyone will ever read this, but if you do, I hope you enjoy it. To be honest this is more the place for me to try and learn how to create a webpage with GitHub pages and jekyll.

A complete list of all posts so far can be found [here](post-overview).

## About me

I'm Jonas and I'm about {{ diffDays | round: 0 }} years old. I'm currently studying computer science at the University of Oldenburg, Lower Saxony, Germany. Besides my studies I work as a student assistant for the university.

I got into computer science when I was about 12 years old. I really started out when I joined the school's robotics club. But to be honest, my interest started already earlier. My about 3 years older brother joined the robotics club when I was still in elementary school. I was always fascinated and jealous when he came home with a LEGO Mindstorms robot and could play with LEGO as part of his homework. I was eager to also get the chance to play with LEGO as part of my homework. So my brother told me the start out with Scratch as my first language and get first algorithmic experiences. During the summer vacations I started out and developed my first mini game in scratch. It wasn't much - I just started my journey - but I was happy with it. After two more years I was finally old enough to join the robotics club and I started building a robot, code it with a C-esque language called NXC and had my first robotics competition called [RoboCup](https://www.robocup.org/). Also at that time, I had my first contact with the programming language Java.

During that I tried more and more computer and coding related stuff and I gathered a lot of experiences. All in all this allowed me to have an really nice time during the advanced courses of maths and computer science in high school. Partly, because I knew the stuff from earlier experiments and partly because I was and am genuinely interested in the topics.

After graduating from high school I knew I want to study computer science at the university. Yet, I didn't want to straight go on to study, so I decided to do a voluntary scientific year at the University of Oldenburg. After which I decided to stay at the university and study computer science, which is what I'm doing now.