import { useEffect, useState } from 'react'
import { api, OfferStrategy, SimulateResponse, StrategyCreate } from '../api/client'
import PriceComparisonBar from '../components/ui/PriceComparisonBar'
import { useToast } from '../components/ui/ToastProvider'

const CONDITIONS = ['NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR']
const CONDITION_LABELS: Record<string, string> = {
  NEW: 'New', LIKE_NEW: 'Like New', GOOD: 'Good', FAIR: 'Fair', POOR: 'Poor',
}

const DEFAULT_FORM: StrategyCreate = {
  name: '',
  default_offer_pct: 0.65,
  min_offer_pct: 0.50,
  max_offer_pct: 0.80,
  priority: 0,
  condition: null,
}

function StrategyModal({
  strategy,
  onSave,
  onClose,
}: {
  strategy: OfferStrategy | null
  onSave: (data: StrategyCreate) => Promise<void>
  onClose: () => void
}) {
  const [form, setForm] = useState<StrategyCreate>(
    strategy
      ? {
          name: strategy.name,
          default_offer_pct: strategy.default_offer_pct,
          min_offer_pct: strategy.min_offer_pct,
          max_offer_pct: strategy.max_offer_pct,
          priority: strategy.priority,
          condition: strategy.condition,
        }
      : DEFAULT_FORM
  )
  const [saving, setSaving] = useState(false)

  const set = (field: keyof StrategyCreate, value: string | number | null) =>
    setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-5">
          {strategy ? 'Edit Strategy' : 'New Strategy'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="e.g. Default Oakley Strategy"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Default %</label>
              <input
                type="number"
                step="1"
                min="1"
                max="100"
                value={Math.round(form.default_offer_pct * 100)}
                onChange={(e) => set('default_offer_pct', parseInt(e.target.value) / 100)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Min %</label>
              <input
                type="number"
                step="1"
                min="1"
                max="100"
                value={Math.round(form.min_offer_pct * 100)}
                onChange={(e) => set('min_offer_pct', parseInt(e.target.value) / 100)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Max %</label>
              <input
                type="number"
                step="1"
                min="1"
                max="100"
                value={Math.round(form.max_offer_pct * 100)}
                onChange={(e) => set('max_offer_pct', parseInt(e.target.value) / 100)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Priority</label>
              <input
                type="number"
                value={form.priority}
                onChange={(e) => set('priority', parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Condition filter</label>
              <select
                value={form.condition ?? ''}
                onChange={(e) => set('condition', e.target.value || null)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              >
                <option value="">Any condition</option>
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>{CONDITION_LABELS[c]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : strategy ? 'Save Changes' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Offers() {
  const { toast } = useToast()
  const [strategies, setStrategies] = useState<OfferStrategy[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingStrategy, setEditingStrategy] = useState<OfferStrategy | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [simPrice, setSimPrice] = useState('100')
  const [simCondition, setSimCondition] = useState('GOOD')
  const [simResult, setSimResult] = useState<SimulateResponse | null>(null)

  const load = () =>
    api.strategies()
      .then(setStrategies)
      .catch(console.error)
      .finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const openNew = () => { setEditingStrategy(null); setModalOpen(true) }
  const openEdit = (s: OfferStrategy) => { setEditingStrategy(s); setModalOpen(true) }
  const closeModal = () => setModalOpen(false)

  const handleSave = async (data: StrategyCreate) => {
    if (!editingStrategy) {
      await api.createStrategy(data)
      toast('success', 'Strategy created')
    } else {
      await api.updateStrategy(editingStrategy.id, data)
      toast('success', 'Strategy updated')
    }
    closeModal()
    load()
  }

  const handleToggle = async (s: OfferStrategy) => {
    try {
      await api.updateStrategy(s.id, { is_active: !s.is_active })
      setStrategies((prev) =>
        prev.map((x) => x.id === s.id ? { ...x, is_active: !s.is_active } : x)
      )
    } catch {
      toast('error', 'Failed to update')
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await api.deleteStrategy(id)
      setStrategies((prev) => prev.filter((s) => s.id !== id))
      toast('success', 'Strategy deleted')
    } catch {
      toast('error', 'Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  const handleSimulate = async () => {
    try {
      const result = await api.simulateOffer({
        listed_price: parseFloat(simPrice),
        condition: simCondition,
      })
      setSimResult(result)
    } catch (err) {
      console.error(err)
    }
  }

  const marginColor = simResult
    ? simResult.estimated_margin > 10 ? 'bg-green-50 border-green-200'
    : simResult.estimated_margin > 0 ? 'bg-amber-50 border-amber-200'
    : 'bg-red-50 border-red-200'
    : ''

  const marginTextColor = simResult
    ? simResult.estimated_margin > 10 ? 'text-green-600'
    : simResult.estimated_margin > 0 ? 'text-amber-600'
    : 'text-red-600'
    : ''

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Offer Strategies</h1>
        <button
          onClick={openNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + New Strategy
        </button>
      </div>

      {/* Simulator */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Offer Simulator</h2>
        <div className="flex gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Listed Price (EUR)</label>
            <input
              type="number"
              value={simPrice}
              onChange={(e) => setSimPrice(e.target.value)}
              className="px-3 py-2 border rounded-md w-32"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Condition</label>
            <select
              value={simCondition}
              onChange={(e) => setSimCondition(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>{CONDITION_LABELS[c]}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSimulate}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Simulate
          </button>
        </div>

        {simResult && (
          <div className={`mt-4 p-4 rounded-md border ${marginColor}`}>
            <div className="grid grid-cols-3 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-500">Offer:</span>{' '}
                <span className="font-bold">{simResult.offer_amount.toFixed(2)} EUR</span>
                <span className="text-gray-400 ml-1">({(simResult.offer_percentage * 100).toFixed(0)}%)</span>
              </div>
              <div>
                <span className="text-gray-500">Est. Margin:</span>{' '}
                <span className={`font-bold ${marginTextColor}`}>
                  {simResult.estimated_margin.toFixed(2)} EUR
                </span>
              </div>
            </div>
            <div className="pt-4 pb-5">
              <PriceComparisonBar
                listedPrice={simResult.listed_price}
                offerAmount={simResult.offer_amount}
                resaleValue={simResult.listed_price + simResult.estimated_margin}
              />
            </div>
          </div>
        )}
      </div>

      {/* Strategy list */}
      {loading ? (
        <p className="text-gray-500">Loading strategies...</p>
      ) : strategies.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-400 mb-4">No offer strategies configured yet.</p>
          <button
            onClick={openNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Create your first strategy
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 text-center font-medium text-gray-600">Condition</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Default %</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Min %</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Max %</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Priority</th>
                <th className="px-4 py-3 text-center font-medium text-gray-600">Active</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {strategies.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-center text-gray-500">
                    {s.condition ? CONDITION_LABELS[s.condition] : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-right">{(s.default_offer_pct * 100).toFixed(0)}%</td>
                  <td className="px-4 py-3 text-right text-gray-500">{(s.min_offer_pct * 100).toFixed(0)}%</td>
                  <td className="px-4 py-3 text-right text-gray-500">{(s.max_offer_pct * 100).toFixed(0)}%</td>
                  <td className="px-4 py-3 text-right">{s.priority}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(s)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${
                        s.is_active ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          s.is_active ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openEdit(s)}
                        className="px-3 py-1 text-xs border rounded hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        disabled={deletingId === s.id}
                        className="px-3 py-1 text-xs border border-red-200 text-red-600 rounded hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId === s.id ? '...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <StrategyModal
          strategy={editingStrategy}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
