
import { useState, useEffect } from 'react'

function App() {
  // Informacoes dos campos
  const [name, setName] = useState('')
  const [universe, setUniverse] = useState('')
  const [power, setPower] = useState('')

  // Lista de herois
  const [heroes, setHeroes] = useState([])

  // Buscar os herois cadastrados
  async function loadHeroes() {
    const response = await fetch('/api/heroes')
    const data = await response.json()

    setHeroes(data)
  }

  // Carregar os dados quando abrir a pagina
  useEffect(() => {
    loadHeroes()
  }, [])

  // Cadastrar um novo heroi
  async function handleSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/heroes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        universe,
        power
      })
    })

    if (response.ok) {
      setName('')
      setUniverse('')
      setPower('')

      loadHeroes()
    } else {
      alert('Erro ao cadastrar heroi.')
    }
  }

  // Excluir um heroi
  async function deleteHero(id) {
    const confirmacao = window.confirm(
      'Deseja realmente excluir este heroi?'
    )

    if (!confirmacao) return

    const response = await fetch(`/api/heroes/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      loadHeroes()
    } else {
      alert('Erro ao excluir heroi.')
    }
  }

  return (
    <main className="min-h-screen bg-slate-190 text-gray-800">


      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Formulario de cadastro */}
        <section className="mb-10">

          <h2 className="text-lg font-semibold mb-5">
            Cadastrar herói
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div>
                <label className="block text-sm mb-2">
                  nome
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome do herói"
                  required
                  className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Universo
                </label>

                <input
                  type="text"
                  value={universe}
                  onChange={(e) => setUniverse(e.target.value)}
                  placeholder="Ex: Marvel"
                  required
                  className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Poder
                </label>

                <input
                  type="text"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  placeholder="Poder do herói"
                  required
                  className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-600"
                />
              </div>

            </div>

            <button
              type="submit"
              className="mt-5 bg-gray-500 text-white px-5 py-2 text-sm hover:bg-gray-700"
            >
              Cadastrar
            </button>

          </form>
        </section>

        {/* Lista de herois */}
        <section>

          <h2 className="text-lg font-semibold mb-5">
            Heróis cadastrados
          </h2>

          <div className="overflow-x-auto border border-gray-300">

            <table className="w-full text-left text-sm">

              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">Universo</th>
                  <th className="px-4 py-3 font-semibold">Poder</th>
                  <th className="px-4 py-3 font-semibold">Ações</th>
                </tr>
              </thead>

              <tbody>

                {heroes.map((hero) => (
                  <tr
                    key={hero.id}
                    className="border-b border-gray-200"
                  >

                    <td className="px-4 py-3">
                      {hero.name}
                    </td>

                    <td className="px-4 py-3">
                      {hero.universe}
                    </td>

                    <td className="px-4 py-3">
                      {hero.power}
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteHero(hero.id)}
                        className="text-red-700 hover:underline"
                      >
                        Excluir
                      </button>
                    </td>

                  </tr>
                ))}

                {heroes.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center px-4 py-6 text-gray-500"
                    >
                      Nenhum herói cadastrado.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

          <p className="text-sm text-gray-500 mt-3">
            Total de heróis: {heroes.length}
          </p>

        </section>

      </div>
    </main>
  )
}

export default App
