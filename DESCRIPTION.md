TODO: Quick scratch breakdown of your to-dos, how you broke up the different tasks and any QA / tests you did.

## First pass - for design approval
- [X] Get frontend and backend running
  - backend had a port conflict on 5000, moved to 4000 but should use a env var instead
- [X] Test backend calls work
  - included vueuse to get access to useFetch - probably not needed
- [X] Setup basic App style to center component
- [X] Get a really basic loan calculator component
  - [X] Create basic component layout
  - [X] Create basic selects and inputs
  - [X] Create refs for input + selects
  - [X] Create computed values for repayment results
  - [X] Read select values from backend
  - [X] Use PMT function to get result
    - hard to understand - will make code more readable
  - [X] Get correct results from PMT function
- [X] Create input 
  - [X] remove border and create basic styling
  - [X] find a style that works well in a sentence
    - underlined selects fit nicer in sentence
  - [X] only accept numbers and commas
    - feels nicer if commas are automatic
  - [X] setup minimum and maximum values
    - feels bad if the number gets clamped as your typing it in
    - feels nicer if the amount errors and has error text saying why
  - [X] modify input to be in currency mode
- [X] Create Select
  - [X] match style of the input
- [X] Test on mobile
  - select styling in safari was wrong, needed to add webkit css
- [X] Test on XL screen 
- [X] get colors, font and styling from Valiant website
- [X] test PMT function
- [X] fix PMT function to be readable
  - moved it to a composable, removed unit test for now
- [X] what if the backend doesn't exist
- [X] write cypress frontend tests
  - test correct values for all the settings


## Second pass - code cleanup 
- [X] create new component for input currency
  - this component could get used in lots of places
  - setup model + props
  - v-model is a number even though it takes and displays text
  - v-model:text to get the actual text
  - make it customizable so it can be used elsewhere
  - inherit colors
- [X] create new component for select underline
  - inherit colors
  - make it customizable so it can be used elsewhere
- [X] cypress test for mobile should make sure there it no scroll bars
- [X] fix all eslint warnings
  - only tailwind related issues left
- [X] add vitest back in


## Third pass - feedback
- [X] convert all CSS to tailwind
- [X] fix total repayments error
- [X] fix all eslint warnings
