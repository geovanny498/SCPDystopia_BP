export const bulletEntityImpact = async (_0x73a840) => {
    const _0x345c12 = _0x1da2fa;
    system[_0x345c12(0x1f3)](() => {
        const _0x24f03b = _0x345c12,
            _0x3da6c4 = _0x73a840[_0x24f03b(0x20a)], // Shooter
            _0x57625c = _0x73a840[_0x24f03b(0x1ea)]; // Projectile

        if (!_0x57625c || !_0x57625c[_0x24f03b(0x21b)]()) return;
        if (_0x57625c["typeId"] != _0x24f03b(0x224)) return;

        const _0x3ab718 = _0x73a840[_0x24f03b(0x23b)]();
        if (!_0x3ab718) return;

        const _0x366dbc = _0x3ab718["entity"]; // Target entity
        if (!_0x366dbc || !_0x366dbc["isValid"]() || !_0x366dbc[_0x24f03b(0x1fe)])
            return;

        const _0x467ed5 = _0x57625c[_0x24f03b(0x242)](
            EntityComponentTypes["Variant"]
        )?.["value"];
        if (!_0x467ed5) return;

        const _0x12035f = DAMAGE[_0x24f03b(0x23e) + _0x467ed5];
        if (!_0x12035f) return;

        let _0x4d0f23 = _0x366dbc,
            _0x286a7c = calcDamage(
                _0x57625c,
                _0x3da6c4,
                _0x4d0f23,
                _0x12035f[_0x24f03b(0x22f)],
                _0x73a840[_0x24f03b(0x24b)]
            );

        // Modificación: Aplicar daño directamente al componente de salud
        const healthComponent = _0x4d0f23.getComponent("minecraft:health");
        if (healthComponent) {
            healthComponent.currentValue -= _0x286a7c.damage; // Reducir salud directamente
            if (healthComponent.currentValue <= 0) {
                _0x4d0f23.triggerEvent("minecraft:death"); // Activar evento de muerte si la salud llega a 0
            }
        }

        // Opcional: Agregar efectos visuales o de sonido
        if (_0x3da6c4 && _0x3da6c4 instanceof Player) {
            _0x3da6c4.triggerEvent(
                _0x286a7c["headshot"]
                    ? "gabrielaplok:add_hitmark_headshot"
                    : "gabrielaplok:add_hitmark"
            );
        }
    });
};