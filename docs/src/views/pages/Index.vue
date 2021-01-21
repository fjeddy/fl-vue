<template>
  <div>

    <h1>fl-vue</h1>
    <p class="lead">A simple collection of VueJS components and mixins that
    interacts and generate content based on a JSON API response.</p>

    <section>
      <h2>It exists...</h2>
      <p>...because I mostly develop backend Rest API's and from time to time
      also make the frontend. Without failure, then I end up writing the
      exact same code as I've done multiple times before on different projects.</p>

      <p>There are plenty of frameworks out there, and this one is likely not
      better then any of them. Maybe even worse? But it's tailored towards
      JSON API's and is intended to quickly generate standard HTML output based on
      data from the API. A good first-quick-example of how and why, take a look
      at the <fl-link to="/components/fl-link" title="fl-link" /> component.</p>
    </section>

    <section>
      <h2>It depends on..</h2>
      <p>...plugins like vue router is something I use in all my projects, and
      it's therefor required by this framework. Meta tags in the routes are used
      to determine the layout and content displayed.</p>

      <p>Vue-router is not included, in any way, by fl-vue. But it does expect
        vue-router to be registered and used in your app, and you therefor need
        to include it on your own.</p>

      <ul>
        <li>
          <strong><fl-link to="https://github.com/twbs/bootstrap" title="Bootstrap 5" blank /></strong>
          - Includes the core essentials required
          from Bootstrap. The framework is Bootstrap based, and it's assumed you
          use Bootstrap as well.
        </li>

        <li>
          <strong><fl-link to="https://github.com/axios/axios" title="Axios" blank /></strong>
          - Axios is used whenever a call is made to the
          backend Rest API.
        </li>

        <li>
          <strong><fl-link to="https://github.com/softonic/axios-retry" title="axios-retry" blank /></strong>
          - Allows us to retry failing connections
          X amount of times.
        </li>

        <li>
          <strong><fl-link to="https://github.com/PrismLibrary/Prism" title="Prism" blank /></strong>
          - Prism is included and used if you use the
          <fl-link to="/components/fl-code" title="fl-code" /> component.
        </li>

        <li>
          <strong><fl-link to="https://github.com/lodash/lodash" title="Lodash" blank /></strong>
          - We use a few functions from Lodash, such as <code>merge</code>
        </li>
      </ul>

      <p>Dependencies are handled if you're using vue-cli and build the source
      from your project. fl-vue will only include what you use. But if you use the
      browser version of fl-vue, then the dependencies would have to be included
      in your project as needed.</p>
    </section>

    <section>
      <h2>A demo...</h2>
      <p>...is found right here. The documentation is also a live example of
      fl-vue, all the docs are made solely out of Vue and fl-vue, there is also
      a demo of every component at the top of the page.</p>
    </section>

    <section>
      <h2>It's licensed...</h2>
      <p>...under MIT, have fun.</p>
    </section>

  </div>
</template>
