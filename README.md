

## Problem with $event

So, my goal is to repeat the feature, that I actually managed to do in tutorial, but now I have an error.
The sence is that I have two main components on the page (**app-shopping-list and app-recipes**):
```html
<div class="container-fluid below">
  <div class="row">
    <div (shopListChosen)="changeChoice($event)" *ngIf = 'pagePart === "shoppingList" || pagePart === "both"' class="shop-list col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
      <app-shopping-list></app-shopping-list>
    </div>
    <div (recipesChosen)="changeChoice($event)" *ngIf = 'pagePart === "recipes" || pagePart === "both"' class="recipes col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
      <app-recipes></app-recipes>
    </div>
  </div>
</div>
```
They have their own containers.
I also have kind of header (separate component), where I have two links (**Recipes and Shopping List**):

```html
<nav class="navbar navbar-light bg-light navbar-expand-sm fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      ...
    </div>
    <div class="collapse navbar-collapse" id="collapsing">
      <ul class="navbar-nav nav left-nav">
        <li class="nav-item">
          <a href="#" class="nav-link" (click) = "onRecipesClicked()">Recipes</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" (click) = "onShoplistClicked()">Shopping list</a>
        </li>
      </ul>
    </div>
      ...
  </div>
</nav>
```
So, now my goal is to make one of the main components disappear, when I click the link in the header of another one (if I click **shopping list**, **recipes** disappear, the same the opposite way);

### How I try to accomplish that

I have directives *ngIf on both of the main components, you can see that above in code snippet. The appearance of the components depends on change of the component property **pagePart**, located in app.component.ts (with default value 'both'):

```ts
  import { part } from './shared/part.model';

  export class AppComponent {
  ...
  pagePart: part = 'both';
  
  ...
}
```

As u can see, **part** type is imported from separate file in 'shared' folder, 'part.model.ts'

```ts
  export type part = 'recipes' | 'shoppingList' | 'both';
```

### Change of the pagePart property

In code snippet above you can see two custom events in containers of main components. They trigger function **changeChoice()** (in app.component.ts) with $event argument, which has to catch the info about links clicking, when I emit the event from another 'header.component.ts' file.

function in 'app.component.ts' is simple:

```ts
   changeChoice(changeSign: {sign: part}) {
    this.pagePart = changeSign.sign;
  }
```
Now what I do in 'header.component.ts' :

```ts
  export class HeaderComponent {

  @Output() shopListChosen = new EventEmitter<{sign: part}>();
  @Output() recipesChosen = new EventEmitter<{sign: part}>();


  onRecipesClicked() {
    this.recipesChosen.emit({sign:'recipes'});
  }
  onShoplistClicked() { 
    this.shopListChosen.emit({sign:'shoppingList'});
  }
}
```

I emit the event here, and send the object with info about what value pagePart has to get. At least that's how this code has to work (because again, as I said, I've already used this feature with the 100% same code, and it worked)

So, eventually, the problem. This code gives me an error when compiling:

```
  Error: src/app/app.component.html:8:41 - error TS2345: Argument of type 'Event' is not assignable to parameter of type '{ sign: part; }'.
  Property 'sign' is missing in type 'Event' but required in type '{ sign: part; }'.

     <div (shopListChosen)="changeChoice($event)" *ngIf = 'pagePart === "shoppingList" || pagePart === "both"' class="shop-list col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                          ~~~~~~
```
and the same error for the second case (with Recipes). I tryed everything I could find about it in the internet, and it still doesn't work (red screen with mistakes or just not working feature). So that's why I write it here, in hope to get the helping hand from programming gods :3