# Technical Assessment P2

## 0. Github Housekeeping - Done

Please remove `node_modules` from the repo and add to `.gitignore`. This will make the checkout faster, and it's good practice to `npm i` on a freshly cloned repo anyway. :)

## 1. Address Feedback - Done

### Overall

Fonts look good on iOS, on Android there are some places where it looks different from the screens on Zeplin, for example on the `SignupScreen` the "Select location" text does not appear to be in Montserrat-Black.  Spend no more than 30 minutes fixing this.

### Intro screen - Done

Update the line breaks to appear like the Zeplin design:

> ADVENTURE

> IS ONLY

> A CLICK

> AWAY.

### California parks selection screen - Done

Looks great in iOS - on Android, the drop shadow looks like it spreads too wide and gets cut off by the next item on the list (see screen shot).  Please make it smaller so it is not cut off like this, but spend no more than 30 minutes if this turns out to be non-trivial.

## 2. Implement Fetching from API - Done

We have added a simple API to download park data and save the user's preferences.  Please update the app to make the appropriate GET and POST request to implement the following functionality:

***Get the list of parks*** -Done

- When the user visits the Select Location screen, obtain the list of parks from the following endpoint: http://qeepfake.herokuapp.com/parks

***Get the current selection*** -Done

- On app load, obtain the current selection from the following endpoint: http://qeepfake.herokuapp.com/selectedPark

***Set the current selection*** -Done

- When the user has made their selection and clicks "Confirm", then submit the user's selection to the following endpoint: http://qeepfake.herokuapp.com/selectedPark

## 3. (Optional) Any additional improvement - Done

--added bookmark feature
    - bookmark icon empty if nothing bookmark is not saved
    - click bookmark will fill icon and save state bookmark as saved
--activity loading indicator on ParkList
--SplashScreen

Feel free to add anything else you want, but don't stray too far from the spec, and please cap your effort at 1 hour.
