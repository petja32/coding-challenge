<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { cubicInOut } from "svelte/easing"
  export let content = "data";
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
    transition:fly={{ delay: 100, duration: 200, y: 100,easing: cubicInOut }}
    on:outroend={callback}
    role="alert"
    class="mx-12 w-full border-2 border-black bg-white p-3"
  >
    <div class="flex items-start gap-4">
      <div class="flex-1">
        <span>
          <strong class="font-medium text-gray-900"> Test result: </strong>
          {content}
        </span>
      </div>
    </div>
  </div>
{/if}
