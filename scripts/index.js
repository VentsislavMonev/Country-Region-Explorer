const checkRegion = document.querySelector(".check-region-button");

checkRegion.addEventListener("click", e=> {
    const  regionRadio = document.querySelector('input[name="region"]:checked');

    if(regionRadio) {
        window.location.assign(`/region.html?region=${regionRadio.value}`);
    }
})