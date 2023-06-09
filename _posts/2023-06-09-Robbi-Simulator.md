---
layout: post
title:  "Robbi Simulator"
date:   2023-06-09 14:18:00 +0200
tags: java studies memento-pattern
repository: RobbiSimulator
---

The Robbi Simulator was part of a course I took at the university. It was in the 3. Semester so I already finished the first modules at univeristy-level and I knew what I had to expect. During the first meeting we got introduced to the concept of a Mini-Programmingworld (MPW) which I was already familiar with. I had already heard and used [Greenfoot](https://www.greenfoot.org/), [AntMe](https://www.antme.net/en/) as well as [BlueJ](https://www.bluej.org/). In the course our lecturer showed us his very own implementation called [Hamster Simulator](https://www.java-hamster-modell.de/simulator.html). So our task was to come up with a simular idea and implement more ore less all the features that are present in the Hamster Simulator. Having participated in the RoboCup competition multiple times, it was easy for me to come up with an idea focused on robotics. Taking some more inspiration from the movie Wall-E, I placed my robbi in a scrapyard and so the world creation was done.

Over the following weeks I implemented the simulator step by step following the tasks given by our lecturer. In weekly meetings we discussed our solutions and shaired experiences. If you have a look at the branch graph and inspect the merges into the main branch closer you can easily detect what tasks have been given for the particular week. 

The two semesters before that I had to get used to the new level at universtity so I did not really had the time to get back into programming at the first year of studies. So I decided I want to take the time for this project and to follow all best practices that I have learnt so far to be able to have a scalable and usable project. I had my first experiences with deployen the javadoc of my project to [github pages](https://jaypi4c.github.io/RobbiSimulator/) and I tried to find many usefull libraries that I can use in basically all my new Java projects as there is no need in reinventing the wheel. So that was also the time that I stumbled upon [Lombok](https://projectlombok.org/) for the first time and I really don't want to miss it anymore.

Also I remember that I was introduced to the memento pattern in the course software-engineering. While I learnt the benefits of the pattern I thought this might be of great use in the Robbi Simulator. So I took the time and [implemented it](https://github.com/JayPi4c/RobbiSimulator/commit/d3af9cef377e9faea06cd38d124a4f4083dcc688). I'm really happy with the result and I think it's a great example of the memento pattern.
 
Every now and then I'm still implementing some new features into the simulator. For more information about the project and the latest news take a look yourself. You can find a link to the repository at the bottom of this post.