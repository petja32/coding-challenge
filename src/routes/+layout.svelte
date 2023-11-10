<script>
  import "../app.css";
</script>

<div
  id="main-container"
  class="mx-6 my-6 lg:my-12 flex flex-col items-center justify-center"
>
  <slot />
</div>

<style>
  @media only screen and (min-width: 600px) {
    #main-container {
      margin-left: 32em;
      margin-right: 32em;
    }
  }
</style>
