<script setup lang="ts">
// Zeigt eine Beispielaufgabe mit der echten Runtime, bedienbar, und darunter ihre Kodierung live.
// Das Bundle kommt aus public/bundles/ (scripts/examples.mjs); Runtime und Kodierer laden erst im Browser.
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { withBase } from 'vitepress';

const props = withDefaults(defineProps<{
    /** Name der Datei unter examples/ ohne Endung */
    file: string;
    /** Name der Aufgabe in der Datei */
    item: string;
    /** Anpassungen des Bedarfsprofils, durch Komma getrennt, z. B. "simple_language" */
    accommodations?: string;
    /** Kodierung unter der Aufgabe zeigen */
    codes?: boolean;
    /** Überschrift über der Vorschau */
    label?: string;
}>(), { accommodations: '', codes: true, label: 'Vorschau' });

const host = ref<HTMLElement>();
const rows = ref<Array<{ name: string; text: string }>>([]);
const error = ref('');
let stop: (() => void) | undefined;

onMounted(async () => {
    try {
        const [{ createItemInstance, codeResponses, effect }, { renderItem }, bundle] = await Promise.all([
            import('@answerfield/runtime-core'),
            import('@answerfield/runtime-wc'),
            fetch(withBase(`/bundles/${props.file}.bundle.json`)).then(r => {
                if (!r.ok) throw new Error(`Bundle ${props.file} fehlt (npm run examples)`);
                return r.json();
            })
        ]);
        const accommodations = props.accommodations.split(',').map(a => a.trim()).filter(Boolean);
        const instance = createItemInstance(bundle, props.item, { accommodations });
        renderItem(instance, host.value!);
        if (!props.codes) return;
        stop = effect(() => {
            const result = codeResponses(bundle, instance.responses());
            const list = Object.entries(result.variables).map(([name, v]) => ({
                name,
                text: v.missing ? `Missing-Code „${v.missing}“`
                    : v.pending ? 'offen, manuell zu kodieren'
                    : v.error ? `Fehler: ${v.error}`
                    : `Code ${v.code}${v.label ? ` „${v.label}“` : ''}${v.score !== undefined ? `, Score ${v.score}` : ''}`
            }));
            for (const [name, score] of Object.entries(result.scores)) {
                if (!(name in result.variables)) list.push({ name, text: `Score ${score}` });
            }
            rows.value = list;
        });
    } catch (e) {
        error.value = e instanceof Error ? e.message : String(e);
    }
});

onBeforeUnmount(() => stop?.());
</script>

<template>
  <figure class="af-preview">
    <figcaption>{{ label }}</figcaption>
    <div ref="host" class="af-preview-item" />
    <p v-if="error" class="af-preview-error">{{ error }}</p>
    <dl v-if="codes && rows.length" class="af-preview-codes">
      <template v-for="row in rows" :key="row.name">
        <dt><code>{{ row.name }}</code></dt>
        <dd>{{ row.text }}</dd>
      </template>
    </dl>
  </figure>
</template>

<style scoped>
.af-preview {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  overflow: hidden;
}
.af-preview figcaption {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.af-preview-item {
  padding: 12px 16px;
}
.af-preview-error {
  margin: 0;
  padding: 8px 16px;
  color: var(--vp-c-danger-1);
}
.af-preview-codes {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 2px 12px;
  margin: 0;
  padding: 8px 16px;
  font-size: 13px;
  border-top: 1px dashed var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.af-preview-codes dt,
.af-preview-codes dd {
  margin: 0;
}
</style>
