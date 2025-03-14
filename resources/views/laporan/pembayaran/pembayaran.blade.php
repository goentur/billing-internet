<table border="1">
    <thead>
        <tr>
            <th style="font-weight: bold; font-size: 16px" align="center" colspan="10">LAPORAN PEMBAYARAN</th>
        </tr>
        <tr>
            <th style="font-weight: bold; font-size: 14px; text-transform: uppercase" align="center" colspan="10">Periode {{ $periode }}</th>
        </tr>
        <tr>
            <th style="font-weight: bold" align="center" rowspan="3">NO</th>
            <th style="font-weight: bold" align="center" rowspan="3">PEGAWAI</th>
            <th style="font-weight: bold" align="center" rowspan="3">PELANGGAN</th>
            <th style="font-weight: bold" align="center" rowspan="3">ALAMAT</th>
            <th style="font-weight: bold" align="center" rowspan="3">PAKET INTERNET</th>
            <th style="font-weight: bold" align="center" colspan="4">TANGGAL</th>
            <th style="font-weight: bold" align="center" rowspan="3">TOTAL</th>
        </tr>
        <tr>
            <th style="font-weight: bold" align="center" colspan="2">PEMBAYARAN</th>
            <th style="font-weight: bold" align="center" colspan="2">TRANSAKSI</th>
        </tr>
        <tr>
            <th style="font-weight: bold" align="center">TANGGAL</th>
            <th style="font-weight: bold" align="center">JAM</th>
            <th style="font-weight: bold" align="center">TANGGAL</th>
            <th style="font-weight: bold" align="center">JAM</th>
        </tr>
    </thead>
    <tbody>
        @php
            $totalSum = 0;
        @endphp
        @foreach ($datas as $key => $data)
        <tr>
            <td align="center">{{ ++$key }}</td>
            <td>{{ $data['user'] }}</td>
            <td>{{ $data['pelanggan']['nama'] }}</td>
            <td>{{ $data['pelanggan']['alamat'] }}</td>
            <td>{{ $data['paket_internet'] }}</td>
            <td>{{ $data['tanggal_pembayaran']['tanggal'] }} </td>
            <td>{{ $data['tanggal_pembayaran']['jam'] }}</td>
            <td>{{ $data['tanggal_transaksi']['tanggal'] }} </td>
            <td>{{ $data['tanggal_transaksi']['jam'] }}</td>
            <td align="right">{{ $data['total'] }}</td>
        </tr>
        @php
            $totalSum += $data['total'];
        @endphp
        @endforeach
        <tr>
            <td style="font-weight: bold" align="right" colspan="9">TOTAL</td>
            <td style="font-weight: bold" align="right">{{ $totalSum }}</td>
        </tr>
    </tbody>
</table>
