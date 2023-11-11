<script lang="ts">
  import { onMount } from "svelte";
  import { streak } from "$lib/store";

  onMount(() => {});
</script>

<div class="mx-4 w-full lg:w-auto bg-white-300 rounded-full py-2 px-6">
  <div class="flex flex-row justify-center items-center text-center w-10">
    <div class="relative font-share text-lg font-bold w-6 absolute text-gray-100">{$streak}</div>
    <img class="relative" src="/fire.png" alt="fire" width="24px" srcset="" />
  </div>
</div>
