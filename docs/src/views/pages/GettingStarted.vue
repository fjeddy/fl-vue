<template>
  <div>

    <h1>Getting started</h1>
    <p class="lead">Using fl-vue is quite straight forward.</p>

    <section>
      <h2>Getting the framework</h2>
      <p>Include the framework in your build using NPM.</p>

      <fl-code code="npm install fl-vue -S" language="js" />
    </section>

    <section>
      <h2>Initialize the framework</h2>
      <p>You need to initialize the framework in your <code>main.js</code> file
      to get the default settings. This is also the perfect time to set your own
      custom global settings as well.</p>

      <p>Nothing is actually imported or included, you're simply setting a global
      variable with a few settings the framework will use later.</p>

      <fl-code language="js">{`
        Hello
      `}</fl-code>
    </section>

    <section>
      <h2>Include the core components</h2>
      <p>Initalizing the framework set's the settings. But what actuall gets
      things running is including the core components in your <code>App.vue</code>
      file.</p>

      <fl-code language="js">{`
        Hello
      `}</fl-code>
    </section>

  </div>
</template>
