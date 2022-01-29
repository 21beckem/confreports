document.write(`
<style>
.sessionContainer {
}
.sessionTitle {
    box-shadow: 1px 3px 5px rgba(34,34,34,0.6);
    background-color: #ff9999;
    padding: 10px;
    position: sticky;
    top: 80px;
    margin: 50px;
    width: 100%;
    z-index: 1;
}
.talk {
    text-align: left;
    box-shadow: 1px 3px 5px rgb(34 34 34 / 60%);
    margin-bottom: 10px;
}
.talk .header {
    background-color: gray;
    color: white;
    padding: 10px;
    margin-bottom: 0px;
}
.talk .body {
    background-color: white;
    color: black;
    margin-top: 0px;
    padding: 10px;
    border-style: none solid solid solid;
    border-width: 1px;
    font-size: 18px;
}
.talk .header .foundCount {
    color: yellow;
    position: relative;
    float: right;
    right: 15px;
}
.highlight {
    background-color: orange;
}
#scrollHelper {
    position: fixed;
    top: 0;
    right: 0;
    background-color: white;
}
</style>
`);