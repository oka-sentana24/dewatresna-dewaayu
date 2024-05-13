<script>
  import Header from "./Header.svelte";
  import "./styles.css";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let isPageLoading = false;

  onMount(() => {
    setTimeout(() => {
      isPageLoading = true;
    }, 2000); // Adjust the time as needed (in milliseconds)
  });
</script>

<div class="app">
  <!-- <Header /> -->
  <main>
    <div>
      {#if !isPageLoading}
        <div
          class="text-center h-screen w-full items-center justify-center flex fixed top-0 left-0 bg-[#fffde7]"
          transition:fade={{ duration: 3000 }}
        >
          <div class="absolute">
            <h1>Please Wait ...</h1>
          </div>
        </div>
      {:else}
        <slot />
      {/if}
    </div>
  </main>

  <!-- <footer>
    <p>
      visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
    </p>
  </footer> -->
</div>

<style>
  /* .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  } */
</style>
