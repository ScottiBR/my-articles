# How Event Loop Works

##JsEngines (opera,safari crhome v8) palestra theconf

https://en.wikipedia.org/wiki/List_of_ECMAScript_engines

## V8

So now we've hit the bottom of Node.js, this is where things get messy and complex. We started talking about Javascript, which is the higher level concept we have, then we got into a few concepts like: call stack, event loop, heap, queues and so on...

The thing is: none of this stuff is actually implemented in JS, this is all part of the engine. So JavaScript is basically a dynamic typed language which is interpreted, everything we run in JavaScript is passed on to the engine, which interacts with its environment and generates the bytecode needed for the machine to run our program.

And this engine is called V8.

What is V8
V8 is Google's open source high-performance JavaScript and WebAssembly engine. It's written in C++ and used both in Chrome or Chrome-like environments, and Node.js. V8 has the full implementation for ECMAScript as well as WebAssembly. But it does not depend on a browser, in fact, V8 can be run standalone and be embedded into any C++ application.

Overview
V8 was firstly designed to increase JavaScript execution performance inside web browsers - that is why Chrome had a huge difference in speed compared to other browsers back in the day. In order to achieve this increased performance, V8 does something different than just interpret JavaScript code, it translates this code into a more efficient machine code. It compiles JS into machine code at run time by implementing what is called a JIT (Just In Time) compiler.

As of now, most engines actually works the same way, the biggest difference between V8 and the others is that it does not produce any intermediate code at all. It runs your code the first time using a first non-optimized compiler called Ignition, it compiles the code straight to how it should be read, then, after a few runs, another compiler (the JIT compiler) receives a lot of information on how your code actually behave in most cases and recompiles the code so it's optimized to how it's running at that time. This is basically what means to "JIT compile" some code. Different from other languages like C++ which uses AoT (ahead of time) compilation, which means that we first compile, generate an executable, and then you run it. There's no compile task in node.

## Call stack

Every time a function is about to be executed in JavaScript it gets added to the Stack.If that function calls another function within it then that function gets called to the top of the stack.

JavaScript has a single call stack in which it keeps track of what function we’re currently executing and what function is to be executed after that. But first — what’s a stack? A stack is an array-like data structure but with some limitations — you can only add items to the back and only remove the last item. Another example is a pile of plates — you put them on top of each other and at any time you can only remove the top one.

When you’re about to execute a function it is added on the call stack. Then if that function calls another function — the other function will be on top of the first one in the call stack. When you get an error in the console you get a long message that shows you the path of execution — this is what the stack looked in that exact moment. But what if we make a request or put a timeout on something? In theory that should freeze the entire browser until it is executed so the call stack can continue? In practice however, you know that this doesn’t happen — because of the Event Table and Event Queue.

---

Then how it is non-blocking? why not things like setTimeout or asynchronous call complete first blocking other code?

Whenever there is something like asynchronous call or timeout function, it comes stack then it passes to the browser which can do it multiple things together, after finishing the tasks browser puts callback queue, event loop keep looking at the stack and callback queue, when it finds the stack empty it puts first from queue to stack.

## Event Queue

JavaScript runtimes contain a message queue which stores a list of messages to be processed and their associated callback functions.- Carbon five blog.

Every time you call a setTimeout function or you do some async operation — it is added to the Event Table. This is a data structure which knows that a certain function should be triggered after a certain event. Once that event occurs (timeout, click, mouse move) it sends a notice. Bear in mind that the Event Table does not execute functions and does not add them to the call stack on it’s own. It’s sole purpose is to keep track of events and send them to the Event Queue.

The Event Queue is a data structure similar to the stack — again you add items to the back but can only remove them from the front. It kind of stores the correct order in which the functions should be executed. It receives the function calls from the Event Table, but it needs to somehow send them to the Call Stack? This is where the Event Loop comes in.

## Event loop

We’ve finally reached the infamous Event Loop. This is a constantly running process that checks if the call stack is empty. Imagine it like a clock and every time it ticks it looks at the Call Stack and if it is empty it looks into the Event Queue. If there is something in the event queue that is waiting it is moved to the call stack. If not, then nothing happens.

Here are a couple of interesting cases. In what order do you think the following code will run?

```js
setTimeout(() => console.log("first"), 0);
console.log("second");
```

Some people think that because set timeout is called with 0 (zero) it should run immediately. In fact in this specific example you will see “second” printed out before “first”. JavaScript sees the setTimeout and says “Well, I should add this to my Event Table and continue executing”. It will then go through the Event Table, Event Queue and wait for the Event Loop to tick in order to run.

---

The event loop is the term given to the process of the waiting for the queue to receive a message synchronously. The increment that the event loop moves in is called a ‘tick’, and every time it ‘ticks’ it checks if the call stack is empty, if so , it adds the top function in the event queue to the call stack and executes it. Once it is finished processing this function it starts ticking again. This diagram is simple and great.

https://miro.medium.com/max/294/1*f1DkA1gRPWwkse-xjQ9LVA.png

---

Let's step aside of the Node.js environment for a while. In the browser, in pure JavaScript, what would happen if you had a long-running function in your call stack? Those sorts of functions that take a while to finish, like a complex image processing or a long matrix transformation?

In most languages you should have no problem, since they are multi-threaded, however, in single-threaded languages, this is a very serious issue. Because while the call stack has functions to execute, the browser can't actually do anything else, and the browser isn't just about HTML and CSS, there are a few other stuff, like a rendering engine that paints the screen to draw whatever you coded in your markup. This means that if you have long running functions, your browser literally halts all execution in that page. That's why most browsers treat tabs as threads or separate processes, so one tab wouldn't freeze all others.

Another issue that might be raised is that browsers are quite controlling big brothers, so if a tab takes to long to respond, they take action by raising an error to ask you whether you want or not to terminate that web page. So... Not the best UX we can have, right? On the other hand, complex tasks and long running code is what allow us to create great software, so how can we perform those without letting our big brother angry? Asynchronous Callbacks, tha base of what Node.js is all about.

Until ES6, JS actually never had any sort of consensus or notion of asynchrony built into the core itself, this means that JS would receive your order to execute some async code and send it to the engine, which would give JS a thumbs up and answer with "I'll see into it, someday". So there was no order neither logic on how the "later" would behave built into the engines.

JS engines actually do not run isolated from everything. They run inside what is called a hosting environment. This environment can be whatever place JS is running into, like a browser, Node.js or, since JS is pretty much everywhere, can be a toaster or a plane. Every environment is different from each other, every one has their own skills and abilities, but they all have an event loop.

The event loop is what actually takes care of asynchronous code execution for JS Engines, at least of the scheduling part. It is the one who calls the engine and send the commands to be executed, and also is the one who queues response callbacks which the engine returns to be called afterwards. So we're beginning to comprehend that a JS Engine is nothing more than an on-demand execution environment for any JS code, working or not. All that surrounds it, the environment, the event loop, is responsible for scheduling the JS code executions, which are called events.

The event loop has a single task to do: Monitor the call stack and what is called the callback queue. Once the call stack is empty, it'll take the first event from the callback queue and push it into the call stack, which effectively runs it. To this iteration, taking a callback from the queue and executing it into the call stack, we give the name of tick.

As we noted earlier, the ES6 specifies how the event loop should behave, so now, technically, it's within the scope of the JS Engine's responsibilities to take care of that scheduling, which is no longer playing the role of only a hosting environment. The main reason why this happened is because of the introduction of the native Promises in ES6, which - as we'll see later on - needed to take some fine-grained control over scheduling operations and queues.

Once the call stack and all the queues are empty, the event loop will simply terminate the process.

One thing that is important to notice in the above code is that setTimeout will not automatically put your callback on the event loop queue after it's done. setTimeout is an web API whose only job is to set a timer to execute some other function later. After the timer expires, the environment puts your callback into the event loop callback queue, so that some future tick will pick it up and launch it into the call stack.

So when we do setTimeout(cb, 1000) we expect our cb function to be called after 1000 ms, right? Yeah, but that is not what actually happens unde the hood. This is only saying: "Hey! I've noted your request, so when 1000ms pass I'll place your cb function on the queue", but remember, queues have a different order than stacks, so callbacks will be added to the end of the queue, which means that the queue might have other events that were added earlier - so your callback will have to wait the completion of them all in order to be processed. One of the best examples to show how this async madness work is to set a timeout function to 0. Naturally you hope this function to be executed soon after you've added it to the code, right? Wrong.

```js
console.log("Node.js");
setTimeout(() => console.log("is"), 0);
console.log("Awesome!");
```

Our first thought is: "The printed code will be Node.js is Awesome! in three lines", but this is not what happens. Setting a timeout to 0 only defers its callback execution to the next moment when the call stack is clear. In fact, our response would be a Yoda-like phrase:

Node.js
Awesome!
is

---

```js
setTimeout(function() {
  console.log("a");
}, 1500);

console.log("d");

setTimeout(function() {
  console.log("b");
}, 500);

setTimeout(function() {
  console.log("c");
}, 1000);
```

https://process.filestackapi.com/cache=expiry:max/vy8ns2TyQMie4U0GGefS

## ES6 Job Queue

ECMAScript 2015 introduced the concept of the Job Queue, which is used by Promises (also introduced in ES6/ES2015). It’s a way to execute the result of an async function as soon as possible, rather than being put at the end of the call stack.

Promises that resolve before the current function ends will be executed right after the current function.

I find nice the analogy of a rollercoaster ride at an amusement park: the message queue puts you at the back of the queue, behind all the other people, where you will have to wait for your turn, while the job queue is the fastpass ticket that lets you take another ride right after you finished the previous one.

---

This is why ES6 was so important to async executions in JS, it standardized everything we knew about async so they'd all function the same way, and also added another concept called "Microtask Queue" - or "Job Queue". It's a layer on top of the callback queue - which will now be called "Macrotask Queue" - that you'll most likely bump into when working with Promises.

To be very specific and short. The Microtask Queue is a queue that is attached to the end of every tick in the Event Loop. So certain async actions that occur during a tick of the event loop, will not cause a new callback to be added in the Macrotask Queue, but instead, will add an item - which is called "Microtask" or "Job" - to the end of the current tick's Microtask queue. This means that, now, you can be assured that you can add functionality to be executed later in the Microtask queue and it'll be executed right after your tick, before anything from the Macrotask Queue comes up.

Since there are no restrictions of what a Microtask can do to your code, it's possible for a Microtask to add another Microtask in the end of the same queue endlessly, causing what is called a "Microtask loop", which starves the program of the needed resources and prevent it from moving on the the next tick. This is the equivalent of having a while(true) loop running in your code, but asynchronously.

## Conclusion

> “ JavaScript, unlike a lot of other languages, never blocks.”- [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

There is a lot more going on and this is just the basic explanation of the loop and everything else around it. As much as I wanted to keep this as simple as possible there is no way to explain what the Event Loop does without going into the whole process. Something else to have in mind is that this explanation is in the context of the V8 JavaScript Engine. It’s the engine behind Chrome and is also used in Node.

Understanding the event loop is a vital part of using Node.js, whether you are trying to get more insights about this technology, learn how to improve its performance, or find a new, interesting reason to learn a new tool.
