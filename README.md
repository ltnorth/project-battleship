#My Battleships Game - Liam North

The game I chose to make was Battleships, a classic board game for two players.

##Purpose

The purpose of creating this game was to bring together all that I have learnt so far in HTML, CSS and JavaScript to solidify my understanding of the three languages and how they incorporate one another. 

##My Approach

I wanted to take a systematic approach to creating the game, and set out a plan of steps I would take before starting.  
  
* Style the board
* Add the row and column labels
* Make the grid squares show red and white dots alternatively on click
* Randomly add the ships to the board
* Add a second player with their own display
* Implement a check for when a square is clicked, whether to add a red or white dot depending on their opponent's board
* Add hit and miss messages and buttons to switch players on miss; as well as victory screens and a reset button
* Introduce vertically positioned ships

##Implementation

The tools I used to create the game were HTML5, CSS and JavaScript.  
  
Throughout the entire production process I tried to keep the code as dry as possible by constantly questioning the whether each process I introduced could be enclosed inside its own function. I also wanted to make the functions as generic as possible, and for them to not depend on which player they were being used for. For example: a generic function which adds ships to an empty board; also a general function which checks the opponent's board for ship locations when a square is clicked on either player's displays.

##Usage

For now all the files are hosted locally.

##Challenges

Possibly the hardest feature to implement would be randomly adding the ships to the board in such a way that they would not overlap over rows or over each other. There are a few logic checks involved in placing a ship in a valid location, and so writing them in a manner that would take up the least computing power possible became difficult. To ensure that the ships would not overlap rows I wrote my random position generator function in such a way that depending on the length of the ship to be placed, it would only return a position in the grid that was so far away from the end of the row. I was proud of this function because it completely cut out the logic checks involved in deciding whether the ship would overlap with the next row in the grid.

The process of introducing another player with their own display was more difficult than I had first anticipated. It meant that I had to introduce more arguments to each function to not only generate more boards but in the creation of new functions such as the winCheck and hitCheck functions which rely on looking at both player's displays at the same time. I found this obstacle challenging at first whilst I was still trying to understand what I needed to add but once I had got one function working and both displays were set up it then was not as difficult to set up later functions.

The functionality of the JavaScript file, at times, posed more problems to overcome than it solved. Having multiple functions inside one another led to issues with scope; understanding which functions could see which variables. It has also led to the fact that some of my functions require three and four arguments which are fed down a line of four functions, which became confusing at times to read what the arguments represented in terms of what you can see on screen. I tried to make the arguments as recognisable as possible so that they could be traced back up the line of functions but I think this is an area which I need to work on and keep in mind for my future work, by keeping functions as dumb as possible so as to not confuse either myself or anyone else reading my code.














