<div class="tree-container">
  <p>
    <span style="--i:0;">
      <b></b>
      <i></i>
      <b></b>
      <i></i>
      <b></b>
      <i></i>
      <b></b>
    </span>
    <span style="--i:1;">
      <b></b>
      <i></i>
      <b></b>
      <i></i>
      <b></b>
      <i></i>
      <b></b>
    </span>
    <span style="--i:2;">
      <i></i>
      <b></b>
      <i></i>
      <b></b>
      <i></i>
      <b></b>
      <i></i>
      <b></b>
    </span>
    <span style="--i:3;">
      <b></b>
      <i></i>
      <b></b>
      <i></i>
      <b></b>
      <i></i>
    </span>
    <span style="--i:4;">
      <b></b>
      <i></i>
      <b></b>
      <i></i>
      <b></b>
    </span>
    <span style="--i:5;">
      <i></i>
      <b></b>
      <i></i>
      <b></b>
      <i></i>
    </span>
    <span style="--i:6;">
      <b></b>
      <i></i>
      <b></b>
    </span>
    <span style="--i:7;">
      <i></i>
      <b></b>
    </span>
  </p>
</div>

<style>
  .tree-container {
    position: absolute;
    left: 1em;
    top: -10em;
    scale: 0.4;
  }
  @media only screen and (max-width: 600px) {
    .tree-container {
        display: none;
    }
  }
  p {
    grid-column: 1;
    grid-row: 1;
    width: 100vmin;
    height: 100vmin;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateX(10%) rotate(-66deg);
  }
  p span {
    margin: 0.5vmin auto 2.25vmin;
    display: flex;
    align-items: center;
    height: 4vmin;
    width: 82%;
    gap: 1vmin;
    animation: wavy 6000ms calc(var(--i) * -4400ms - 3000ms) infinite alternate
      ease-in-out;
  }
  b,
  i {
    display: inline-block;
    color: hsl(var(--h, 123), 80%, var(--s, 50%));
    background: linear-gradient(
      to bottom,
      currentColor,
      currentColor,
      hsl(var(--h, 123), 80%, 76%),
      currentColor,
      currentColor,
      currentColor,
      currentColor
    );
    border-radius: 1.5vmin;
    height: 3vmin;

    filter: drop-shadow(0px 0px 5px hsl(var(--h, 123), 80%, var(--s, 50%)));
    translate: calc((5 + var(--i)) * -2vmin) 0;
  }
  b {
    flex: 2;
  }
  b:nth-of-type(2) {
    flex: 2.5;
  }
  b:nth-of-type(3) {
    flex: 1.5;
  }
  span:nth-child(even) b {
    flex: 1.2;
  }
  span:nth-child(even) b:nth-of-type(2) {
    flex: 2;
  }
  span:nth-child(even) b:nth-of-type(3) {
    flex: 2.5;
  }
  i {
    width: 4vmin;
    height: 4vmin;
    border-radius: 2vmin;
    --h: 343;
    animation: rainbow 7000ms infinite linear;
    background: linear-gradient(
        hsl(var(--h, 123) 80% 50% / 0),
        hsl(var(--h, 123) 80% 50%),
        hsl(var(--h, 123) 80% 50%)
      ),
      radial-gradient(
        currentColor,
        currentColor,
        currentColor,
        hsl(var(--h, 123), 80%, 76%),
        currentColor,
        currentColor,
        currentColor
      );
  }

  span + span {
    width: 74%;
    --h: 133;
  }
  span + span + span {
    width: 64%;
    --h: 143;
  }
  span + span + span + span {
    width: 57%;
    --h: 153;
  }
  span + span + span + span + span {
    width: 50%;
    --h: 163;
  }
  span + span + span + span + span + span {
    width: 38%;
    --h: 173;
  }
  span + span + span + span + span + span + span {
    width: 28%;
    --h: 183;
  }
  span + span + span + span + span + span + span + span {
    width: 16%;
    --h: 193;
  }
  @keyframes rainbow {
    0%,
    18% {
      --h: -17;
    }
    18.1%,
    36% {
      --h: 33;
    }
    36.1%,
    54% {
      --h: 63;
    }
    54.1%,
    72% {
      --h: 213;
    }
    72.1%,
    90% {
      --h: 273;
    }
    90.1%,
    100% {
      --h: 323;
    }
  }

  @keyframes candy-cane {
    0%,
    48%,
    100% {
      --h: 343;
      --s: 50%;
    }
    50%,
    98% {
      --h: 343;
      --s: 96%;
    }
  }

  @keyframes wavy {
    0% {
      transform: translateX(-0.8vmin);
    }
    100% {
      transform: translateX(0.8vmin);
    }
  }

  @property --h {
    syntax: '<number>';
    inherits: true;
    initial-value: 123;
  }

  body {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    place-items: center;
    perspective: 100vmin;
    overflow: hidden;
    background: hsl(223 100% 9%);
  }

  * {
    margin: 0;
    box-sizing: border-box;
    position: relative;
  }
</style>
