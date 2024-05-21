const PresetSelector = (props) => {

    const { presetArray, currentPreset } = props;

    return (
        <>
        <span>Preset:</span>
                <select name="presets" id="presets" onChange={(e) => onSelectPreset(presets.value)} placeholder="Select a preset...">
                     { presetArray.map((p, i) => {
                        return <option key={i} onClick={() => setSelectedPreset(p)}>{p.name}</option>
                    })}
        </select>
        </>
    )

}

export default PresetSelector;