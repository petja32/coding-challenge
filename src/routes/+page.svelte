<script lang="ts">
  import { onMount } from "svelte";
  import { create } from "canvas-confetti";
  import Editor from "../component/editor.svelte";
  import Notification from "../component/notification.svelte";

  let code: any;
  let challengeData: any;
  let title: string = "";
  let description: string = "";
  let confetti: any;
  let confettiContainer: any;

  let notificationShow: boolean;
  let notificationContent: string;

  const runFunction = () => {
    let functionBody = code.substring(
      code.indexOf("{") + 1,
      code.lastIndexOf("}")
    );
    let fn = new Function("a", "b", functionBody);

    return fn(challengeData.test[0], challengeData.test[1]);
  };

  const testClicked = () => {
    //notificationShow = true;
    //notificationContent = runFunction();
    confetti({
      particleCount: 100,
      spread: 160,
    });
  };

  const notificationCallback = () => {
    notificationShow = false;
  };

  const createConfettiCanvas = () => {
    confetti = create(confettiContainer, {
      resize: true,
      useWorker: true,
    });
  };

  onMount(async () => {
    const day = 0; //new Date().getDate();
    const resp = await fetch("/challenges.json");
    const respJson = await resp.json();
    challengeData = respJson.data[day];
    title = challengeData.title;
    description = challengeData.description;
    createConfettiCanvas();
  });
</script>

<h2 class="text-3xl font-bold mb-6 lg:mb-12">DAILY CODING CHALLENGE</h2>

<div
  style="pointer-events: none"
  bind:this={confettiContainer}
  class="fixed left-0 right-0 top-0 bottom-0 canvasContainer"
/>

<div class="group relative block w-full">
  <div class="relative flex h-full rounded-2xl border-2 border-black bg-white">
    <div class="p-4 sm:p-6 lg:p-8">
      <h2 class="text-xl font-medium sm:text-2xl">
        {title}
      </h2>

      <p class="mt-4 text-sm sm:text-base">
        {description}
      </p>
    </div>
  </div>
</div>

<div class="group relative block w-full mt-6">
  <Editor bind:editorContent={code} />
</div>

<div class="flex justify-between w-full mt-6">
  <button
    on:click={testClicked}
    class="border-2 border-black py-3 px-8 flex-grow-1 bg-yellow-300 uppercase font-semibold"
  >
    Test
  </button>

  {#if notificationShow}
    <Notification
      bind:content={notificationContent}
      callback={notificationCallback}
    />
  {/if}

  <button
    class="border-2 border-black py-3 px-8 flex-grow-1 bg-green-400 uppercase font-semibold"
  >
    Submit
  </button>
</div>
