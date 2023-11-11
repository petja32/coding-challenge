<script lang="ts">
  import { onMount } from "svelte";
  import { last } from "$lib/store";

  let timer = "Challenge not done!";

  const isDone = () => {
    var today = new Date().setHours(0, 0, 0, 0);
    var lastDay = new Date($last).setHours(0, 0, 0, 0);
    if (today === lastDay) {
      return true;
    }
  };

  const updateCountdown = () => {
    // Get the current date and time
    const now = new Date();

    // Set the target date to tomorrow
    const target = new Date(now);
    target.setDate(now.getDate() + 1);
    target.setHours(0, 0, 0, 0);

    // Calculate the time difference between now and the target date
    const timeDifference = target - now;

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    timer = `${hours}h ${minutes}m ${seconds}s`;

    // Update the countdown every second
    setTimeout(updateCountdown, 1000);
  };

  onMount(() => {
    if (isDone()) {
      updateCountdown();
    }

    last.subscribe(() => {
      if (isDone()) {
        updateCountdown();
      }
    });
  });
</script>

<div class="mx-4 bg-white-300 rounded-full py-2 px-8 w-42">
  <div class="flex justify-center items-start gap-4">
    <div class="flex-1 text-gray-200 font-share">
      {#if timer != "Challenge not done!"}
        <span class="hidden lg:inline">Next in: </span>
      {/if}
      <span>
        {timer}
      </span>
    </div>
  </div>
</div>
