const httpStatus = require('http-status')


exports.order = async (req, res, next) => {
  const date = req.body
  console.log(date)
  try {
    let startDateNew = new Date(req.body.startDate)
    startDateNew.setHours(startDateNew.getHours() + 5)
    startDateNew.setMinutes(startDateNew.getMinutes() + 30)

    let endDateNew = new Date(req.body.endDate)
    endDateNew.setDate(endDateNew.getDate() + 1)
    endDateNew.setHours(endDateNew.getHours() + 5)
    endDateNew.setMinutes(endDateNew.getMinutes() + 29)
    endDateNew.setSeconds(59)
    endDateNew.setMilliseconds(999)
    let filter = { isActive: 'true' }

    if (req.body.searchData !== undefined && req.body.searchData !== null) {
      filter.receiverName = {
        $regex: '.*' + req.body.searchData + '.*',
        $options: 'i',
      }
    }

    if (req.body.startDate !== undefined && req.body.endDate !== null) {
      filter.dateOrder = { $gte: startDateNew, $lte: endDateNew }
    }
    console.log(filter)
    //const orderList = await Order.find({ dateOrder: { $gte: startDateNew, $lte: endDateNew }, receiverName: req.body.name })
    const orderList = await Order.find(filter).sort({ dateOrder: -1 })
    console.log(orderList.length)
    if (orderList.length === 0)
      return res.status(httpStatus.NOT_FOUND).send('No data found')
    return res.status(httpStatus.OK).json({ orderList })
  } catch (error) {
    next(error)
  }
}
