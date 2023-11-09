<script lang="ts">
  import { onMount, tick } from "svelte";
  import { ConfettiCannon } from "svelte-canvas-confetti";
  import Editor from "../component/editor.svelte";
  import Notification from "../component/notification.svelte";
  import { streak, last } from "$lib/store";

  let code: any;
  let challengeData: any;
  let title: string = "";
  let description: string = "";
  let confettiCannon = false;
  let status = 0;

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

  const testClicked = async () => {
    notificationShow = true;
    notificationContent = runFunction();
  };

  const submitClicked = async () => {
    const result = runFunction();
    if (result == challengeData.expected) {
      status = 1;
      streak.set($streak + 1);
      last.set(new Date().getTime());
      confettiCannon = false;
      await tick();
      confettiCannon = true;
    } else {
      status = -1;
    }
  };

  const notificationCallback = () => {
    notificationShow = false;
  };

  const checkLast = () => {
    var today = new Date().setHours(0, 0, 0, 0);
    var lastDay = new Date($last).setHours(0, 0, 0, 0);
    if (today === lastDay) {
      status = 1;
    }
  };

  onMount(async () => {
    const day = 0; //new Date().getDate();
    const resp = await fetch("/challenges.json");
    const respJson = await resp.json();
    checkLast();
    challengeData = respJson.data[day];
    title = challengeData.title;
    description = challengeData.description;
  });
</script>

<h2 class="text-3xl text-white-300 font-bold mb-6 lg:mb-12 font-ubuntu">
  C0DLE
</h2>

<div class="group relative block w-full">
  <div class="relative flex h-full rounded-2xl bg-gray-100">
    <div class="text-white-100 p-4 sm:p-6 lg:p-8">
      <h2 class="text-xl text-center font-medium sm:text-2xl">
        {title}
      </h2>

      <p class="mt-4 text-justify text-sm sm:text-base">
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
    style="min-width: 187px"
    class="rounded-full py-2 px-10 flex-grow-1 bg-white-300 uppercase font-semibold"
  >
    Test code 😉
  </button>

  {#if notificationShow}
    <Notification
      bind:content={notificationContent}
      callback={notificationCallback}
    />
  {/if}

  <button
    class="rounded-full py-3 px-8 flex-grow-1 bg-green uppercase text-white-300 font-semibold"
    style="min-width: 187px"
    disabled={status == 1}
    on:click={submitClicked}
  >
    Submit {#if status == 0}🤔{:else if status == -1}😢{:else}😀{/if}
  </button>
</div>
<div
  class="absolute flex justify-center items-center text-center right-32 top-32"
>
  <img src="/fire.png" alt="fire" srcset="" />
  <span
    style="-webkit-text-stroke: 2px black; text-stroke: 1px black; font-size: 96px; margin-top: 80px;"
    class="absolute font-black text-white-300">{$streak}</span
  >
</div>

{#if confettiCannon}
  <ConfettiCannon
    origin={[window.innerWidth * 0.7, window.innerHeight * 0.8]}
    angle={-90}
    spread={120}
    force={25}
  />
{/if}
