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
    let functionParameters = code.split("(")[1].split(")")[0].split(",");
    let functionBody = code.substring(
      code.indexOf("{") + 1,
      code.lastIndexOf("}")
    );
    let fn;
    switch (challengeData.test.length) {
      case 2:
        fn = new Function(
          functionParameters[0],
          functionParameters[1],
          functionBody
        );
        return fn(challengeData.test[0], challengeData.test[1]);
      case 1:
        fn = new Function(functionParameters[0], functionBody);
        return fn(challengeData.test[0]);
      default:
        fn = new Function(functionBody);
        return fn();
    }
  };

  const testClicked = async () => {
    notificationShow = true;
    notificationContent = runFunction();
  };

  const submitClicked = async () => {
    const result = runFunction();

    if (
      result == challengeData.expected ||
      JSON.stringify(result) == JSON.stringify(challengeData.expected)
    ) {
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
    const day = new Date().getDate();
    const resp = await fetch("/challenges.json");
    const respJson = await resp.json();
    challengeData = respJson.data[day];
    title = challengeData.title;
    description = challengeData.description;
    checkLast();
  });
</script>

<h2 class="hidden lg:block text-7xl text-center text-white-300 font-bold mb-6 lg:mb-12 font-share">
  C0DLE - JS Edition
</h2>

<h2 class="lg:hidden text-5xl text-center text-white-300 font-bold mt-3 lg:mt-0 lg:mb-12 font-share">
  C0DLE
</h2>

<h2 class="lg:hidden text-2xl text-center text-white-300 font-bold lg:mt-0 lg:mb-12 font-share">
  JS Edition
</h2>

<div class="group relative block w-full">
  <div class="relative flex justify-center h-full rounded-2xl bg-gray-100">
    <div class="text-white-100 p-4 sm:p-6 lg:p-8">
      <h2 class="text-xl text-center font-share font-bold sm:text-2xl">
        {title}
      </h2>

      <p class="mt-4 text-justify font-semibold font-share text-sm sm:text-base">
        {description}
      </p>
    </div>
  </div>
</div>

<div class="group relative block w-full mt-6">
  <Editor bind:editorContent={code} />
</div>

<div class="relative flex justify-between w-full mt-6">
  <button
    on:click={testClicked}
    class="rounded-full min-w-min font-share py-2 px-10 flex-grow-1 bg-white-300 uppercase font-semibold hover:line-through"
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
    class="rounded-full min-w-min py-3 px-8 flex-grow-1 bg-green-200 uppercase font-share text-white-300 font-semibold hover:line-through disabled:line-through disabled:bg-green-100"
    disabled={status == 1}
    on:click={submitClicked}
  >
    Submit {#if status == 0}🤔{:else if status == -1}😢{:else}😀{/if}
  </button>
</div>
<div
  class="relative lg:absolute flex justify-center items-center text-center mt-24 lg:mt-0 lg:right-32 lg:top-32 w-48"
>
  <img src="/fire.png" alt="fire" width="100%" srcset="" />
  <span
    style="-webkit-text-stroke: 2px black; text-stroke: 2px black; font-size: 96px; margin-top: 80px;"
    class="font-share absolute text-white-300">{$streak}</span
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
