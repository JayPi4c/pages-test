# JayPi4c Blog


## techincal stuff

This page was build following [this](https://docs.github.com/de/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll) tutorial. All information about how to set up the environment can be found there.

### How to add a new post

To add a new post, create a new file in the `_posts` folder. The file name must follow the pattern `YYYY-MM-DD-Title.md`. The file should start with the following header:
```markdown
---
layout: post
title:  "Title"
date:   YYYY-MM-DD HH:mm:ss +0200
tags: tag1 tag2 tag3
repository: repository-name
---
```
Jekyll will automatically apply the post design to the file and the site will be rendered with the default look.


### local testing

In the above link the whole process of setting up the environment is described. To summarize:
1. Install Jekyll and the required dependencies. See [here](https://jekyllrb.com/docs/installation/ubuntu/).
2. Run `bundle install` to create the website locally.
3. Run `bundle exec jekyll serve` to start the local server.

