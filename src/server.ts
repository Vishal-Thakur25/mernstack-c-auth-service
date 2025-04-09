function Welcome(name: string) {
    console.log('Welcome', name)

    const user = {
        name: 'Vishal',
    }
    const fname = user.name

    return fname + name
}

Welcome('Singh')
