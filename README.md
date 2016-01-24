# Chap App v2

## 1. Install CLI and create the app

```
$ npm install -g ember-cli

$ ember new chat-app

$ cd chat-app

$ ember server
```
- [http://localhost:4200](http://localhost:4200)
- Ember Inspector

## 2. Add bootstrap and some css

Searching bootstrap package: [http://www.emberaddons.com](http://www.emberaddons.com)

```
$ ember install ember-bootstrap
```

Some extra style in `app/styles/app.css`

```
body {
  padding-bottom: 70px;
}

.message-bar {
  height: 70px;
  padding-top: 13px;
}

.alert-chat {
  padding: 5px;
}

.label-user {
  font-size: 100%;
  font-weight: normal;
}

.close-chat {
  line-height: 18px;
}
```

## 3. Add header to the main template

`/app/templates/application.hbs`

```html
<div class="container">
  <div class="page-header">
    <h1>Meetup Chat App
      <small>Let's talk about Ember</small>
    </h1>
  </div>

  {{outlet}}
</div>
```

## 4. Create two pages: index and chat

```
$ ember generate template index
```

Add content to index

```
<h1>Index</h1>
```

```
ember generate route chat
```

## 5. Add dynamic segment to `chat` route

`app/router.js`

```
this.route('chat', { path: '/chat/:user_name' } );
```

## 6. Input box with condition on index page

`app/templates/index.hbs`

```html
<div class="jumbotron text-center">
    <div class="container">
        <div class="col-md-4 col-md-offset-4">
          {{input class='form-control input-lg' placeholder="Enter your name." value=name}}
        </div>

        <div class="col-md-4 col-md-offset-4">
          {{#if name}}
              <h2>Please join to the chat {{name}}!</h2>
            {{#link-to 'chat' name class="btn btn-lg btn-success"}}Join{{/link-to}}
          {{else}}
              <p>Please enter your nickname and click the join button.</p>
          {{/if}}
        </div>
    </div>
</div>
```

## 7. Setup our backend (Firebase)

[Firebase](http://www.firebase.com)

```
ember install emberfire
```

`config/environment.js`

```
firebase: 'https://meetup-chat-app.firebaseio.com/',
```

## 8. Let's create our model

```
ember generate model message user:string text:string
```

Test it in Ember Inspector and check on Firebase.

## 9. Add create message field to the chat screen

`app/templates/chat.hbs`

```html
<div class="navbar navbar-default navbar-fixed-bottom message-bar">
    <div class="container">
        <form class="form-horizontal">
            <div class="form-group">
                <div class="col-xs-10">
                  {{input class='form-control input-lg input-block' placeholder='Your message' value=textMessageFromInput}}
                </div>
                <div class="col-xs-2">
                    <button type="submit" class="btn btn-primary btn-lg" {{action 'createMessage' textMessageFromInput}}>Send</button>
                </div>
            </div>
        </form>
    </div>
</div>
```

`app/routes/chat.js`

Create the action:

```javascript
  actions: {
    createMessage(message) {
      let newRecord = this.store.createRecord('message', {
        text: message,
        user: 'Joe'
      });

      newRecord.save();

      this.controller.set('textMessageFromInput', '');
    }
  }
```

## 10. Download chat messages from the server

`app/routes/chat.js`

```
  userFromParams: null,

  model(params) {
    this.set('userFromParams', params.user_name);
    return this.store.findAll('message');
  }
```

Iterate trough the downloaded model on chat page:

`app/templates/chat.hbs`

```html
{{#each model as |message|}}
    <div class="alert alert-warning alert-chat">
        <p><span class="label label-warning label-user">{{message.user}}</span> {{message.text}}</p>
    </div>
{{/each}}
```

## Build the production code

```
$ ember build --prod
```

Using firebase tools for deployment

```
$ npm install -g firebase-tools
```

```
$ firebase login
```

```
$ firebase init
```

Update `firebase.json`

```json
{
  "firebase": "meetup-chat-app",
  "public": "dist",
  "rewrites": [{
    "source": "**",
    "destination": "/index.html"
  }]
}
```

```
$ firebase deploy
```
