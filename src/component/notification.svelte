<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  export let content = "null";
  export let callback: any = null;
  let show = false;

  onMount(() => {
    show = true;

    setTimeout(() => {
      show = false;
    }, 4000);
  });
</script>

{#if show}
  <div
    transition:fly={{ delay: 100, duration: 200, y: 100, easing: cubicInOut }}
    on:outroend={callback}
    id="notification"
    role="alert"
    class="lg:mx-12 w-full lg:w-auto bg-white-300 rounded-full py-3 px-8"
  >
    <div class="flex items-start gap-4">
      <div class="flex-1 text-gray-200 font-share">
        <span>
          <strong class="font-medium"> Result: </strong>
          {content}
        </span>
      </div>
    </div>
  </div>
{/if}

<style>
  @media only screen and (max-width: 600px) {
    #notification {
      position: absolute;
      margin-top: 4em;
    }
  }
</style>