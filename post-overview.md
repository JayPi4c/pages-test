---
layout: default
title: Post Overview
---

## Welcome to the post overview!

Here you can find a list of all posts:
{% for post in site.posts %}
  <article>
    <h4>
      <a href="{{ site.baseurl }}{{ post.url }}">
        {{ post.title }}
      </a>
    </h4>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
    <br>
    tags: <em>{{ post.tags | join: "</em>, <em>" }}</em>
  </article>
  <hr>
{% endfor %}

Back [Home]({{site.baseurl}}/).