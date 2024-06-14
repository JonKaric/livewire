
export function toggleBooleanStateDirective(el, directive, isTruthy, cachedDisplay = null) {
    isTruthy = directive.modifiers.includes('remove') ? ! isTruthy : isTruthy

    if (directive.modifiers.includes('class')) {
        let classes = directive.expression.split(' ').filter(String)

        if (isTruthy) {
            el.classList.add(...classes)
        } else {
            el.classList.remove(...classes)
        }
    } else if (directive.modifiers.includes('attr')) {
        let attrs = directive.expression.split(', ').map(attr => attr.trim());

        if (isTruthy) {
            attrs.forEach(attr => el.setAttribute(attr, true))
        } else {
            attrs.forEach(attr => el.removeAttribute(attr, true))
        }
    } else {
        let cache = cachedDisplay ?? window
            .getComputedStyle(el, null)
            .getPropertyValue('display')

        let display = (['inline', 'block', 'table', 'flex', 'grid', 'inline-flex']
            .filter(i => directive.modifiers.includes(i))[0] || 'inline-block')

        // If element is to be removed, set display to its current value...
        // display = (directive.modifiers.includes('remove') && ! isTruthy)
        display = (directive.modifiers.includes('remove') && ! isTruthy)
            ? cache : display

        el.style.display = isTruthy ? display : 'none'
    }
}
