<template>
    <form v-on:submit="$emit('search', searchArg)">
        <b-field grouped>
        <b-input
            placeholder="Rechercher un produit ..."
            size="is-large"
            icon="search"
            v-model="searchArg"
            expanded
        ></b-input>
        <p class="control">
            <a class="button is-link is-large" v-on:click="$emit('search', searchArg)" :disabled="searchArg.length === 0">
            <span>Rechercher</span>
            </a>
        </p>
        </b-field>

        <b-collapse class="card" :open="false">
        <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Ajouter des préférences</p>
            <a class="card-header-icon">
            <b-icon :icon="props.open ? 'angle-down' : 'angle-up'"></b-icon>
            </a>
        </div>
        <div class="card-content">
            <div class="content">
            <div class="columns">
                <div class="column">
                <div class="field">
                    <b-checkbox>Basic</b-checkbox>
                </div>
                <div class="field">
                    <b-checkbox>Basic</b-checkbox>
                </div>
                <div class="field">
                    <b-checkbox>Basic</b-checkbox>
                </div>
                </div>
                <div class="column">
                <div class="field">
                    <b-switch>Default</b-switch>
                </div>
                <div class="field">
                    <b-switch>Default</b-switch>
                </div>
                <div class="field">
                    <b-switch>Default</b-switch>
                </div>
                </div>
            </div>
            </div>
        </div>
        </b-collapse>
    </form>
</template>

<script>
export default {
  props: ["baseArg"],
  data: function() {
    return {
      searchArg: this.baseArg ? this.baseArg : "",
    };
  },
  methods: {
      setValue: function(value) {
          this.searchArg = value;
      }
  }
}
</script>