<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
  import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
  import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
  import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
  import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
  import type { editor } from "monaco-editor";
  export let editorContent;
  export let variables = "";

  let editorContainer: HTMLDivElement;

  onMount(async () => {
    const { editor, languages } = await import("monaco-editor");
    let createdEditor: editor.IStandaloneCodeEditor;

    const customTheme: editor.IStandaloneThemeData = {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#00000000",
      },
    };

    editor.defineTheme("custom-theme", customTheme);

    self.MonacoEnvironment = {
      getWorker: function (_: any, label: string) {
        if (label === "json") {
          return new jsonWorker();
        }
        if (label === "css" || label === "scss" || label === "less") {
          return new cssWorker();
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
          return new htmlWorker();
        }
        if (label === "typescript" || label === "javascript") {
          return new tsWorker();
        }
        return new editorWorker();
      },
    };

    languages.typescript.typescriptDefaults.setEagerModelSync(true);

    createdEditor = editor.create(editorContainer, {
      language: "typescript",
      theme: "custom-theme",
      minimap: {
        enabled: false,
      },
      scrollbar: {
        vertical: "hidden",
        horizontal: "hidden",
        verticalScrollbarSize: 0,
        useShadows: false,
      },
    });

    createdEditor.setValue(`function Challenge(${variables}) {
      
}`);

    createdEditor.onDidChangeModelContent(() => {
      editorContent = createdEditor.getValue();
    });
  });

  onDestroy(() => {});
</script>

<div
  class="h-96 w-full rounded-2xl overflow-hidden pt-4 bg-gray-200 text-lg"
  bind:this={editorContainer}
/>

<!--
<textarea
  class="w-full rounded-2xl p-4 sm:p-6 lg:p-8 border-black border-2 text-lg"
  rows="12"
  placeholder="Start coding.."
/>
-->
